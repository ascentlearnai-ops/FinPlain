param(
    [int64]$TargetFreeBytes = 25GB,
    [int]$TempFileMinimumAgeDays = 7,
    [int]$ArchiveMinimumAgeDays = 30,
    [string]$ArchiveRoot = "D:\CDriveArchive",
    [string]$LogRoot = "D:\CDriveMaintenanceLogs"
)

$ErrorActionPreference = "Continue"

New-Item -ItemType Directory -Force -Path $ArchiveRoot, $LogRoot | Out-Null
$LogPath = Join-Path $LogRoot ("c-drive-maintenance-{0:yyyyMMdd-HHmmss}.log" -f (Get-Date))

function Write-Log {
    param([string]$Message)
    $line = "{0:u} {1}" -f (Get-Date), $Message
    Add-Content -LiteralPath $LogPath -Value $line
    Write-Output $line
}

function Get-CFreeBytes {
    return (Get-PSDrive -Name C).Free
}

function Format-Bytes {
    param([int64]$Bytes)
    return "{0:N2} GB" -f ($Bytes / 1GB)
}

function Remove-OldItems {
    param(
        [string]$Root,
        [datetime]$OlderThan
    )

    if (-not (Test-Path -LiteralPath $Root)) {
        return
    }

    Write-Log "Cleaning disposable files older than $($OlderThan.ToShortDateString()) from $Root"

    Get-ChildItem -LiteralPath $Root -Force -Recurse -ErrorAction SilentlyContinue |
        Where-Object {
            -not ($_.Attributes -band [IO.FileAttributes]::ReparsePoint) -and
            $_.LastWriteTime -lt $OlderThan
        } |
        Sort-Object FullName -Descending |
        ForEach-Object {
            try {
                Remove-Item -LiteralPath $_.FullName -Force -Recurse -ErrorAction Stop
                Write-Log "Deleted disposable item: $($_.FullName)"
            } catch {
                Write-Log "Skipped disposable item: $($_.FullName) :: $($_.Exception.Message)"
            }
        }
}

function Move-ArchiveCandidates {
    param(
        [string[]]$Roots,
        [datetime]$OlderThan
    )

    foreach ($root in $Roots) {
        if ((Get-CFreeBytes) -ge $TargetFreeBytes) {
            return
        }

        if (-not (Test-Path -LiteralPath $root)) {
            continue
        }

        Write-Log "Archiving files older than $($OlderThan.ToShortDateString()) from $root"

        Get-ChildItem -LiteralPath $root -File -Force -Recurse -ErrorAction SilentlyContinue |
            Where-Object {
                -not ($_.Attributes -band [IO.FileAttributes]::ReparsePoint) -and
                $_.LastWriteTime -lt $OlderThan -and
                $_.Extension -notin @(".tmp", ".partial", ".crdownload")
            } |
            Sort-Object Length -Descending |
            ForEach-Object {
                if ((Get-CFreeBytes) -ge $TargetFreeBytes) {
                    return
                }

                try {
                    $relativePath = $_.FullName.Substring(3)
                    $destination = Join-Path $ArchiveRoot $relativePath
                    $destinationDirectory = Split-Path -Parent $destination
                    New-Item -ItemType Directory -Force -Path $destinationDirectory | Out-Null

                    if (Test-Path -LiteralPath $destination) {
                        $stamp = Get-Date -Format "yyyyMMddHHmmss"
                        $destination = Join-Path $destinationDirectory ("{0}.{1}{2}" -f $_.BaseName, $stamp, $_.Extension)
                    }

                    Move-Item -LiteralPath $_.FullName -Destination $destination -Force -ErrorAction Stop
                    Write-Log "Archived: $($_.FullName) -> $destination"
                } catch {
                    Write-Log "Skipped archive item: $($_.FullName) :: $($_.Exception.Message)"
                }
            }
    }
}

function Remove-EmptyDirectories {
    param([string[]]$Roots)

    foreach ($root in $Roots) {
        if (-not (Test-Path -LiteralPath $root)) {
            continue
        }

        Get-ChildItem -LiteralPath $root -Directory -Force -Recurse -ErrorAction SilentlyContinue |
            Sort-Object FullName -Descending |
            ForEach-Object {
                try {
                    if (-not ($_.Attributes -band [IO.FileAttributes]::ReparsePoint) -and
                        -not (Get-ChildItem -LiteralPath $_.FullName -Force -ErrorAction SilentlyContinue)) {
                        Remove-Item -LiteralPath $_.FullName -Force -ErrorAction Stop
                        Write-Log "Removed empty directory: $($_.FullName)"
                    }
                } catch {
                    Write-Log "Skipped empty directory: $($_.FullName) :: $($_.Exception.Message)"
                }
            }
    }
}

$startFree = Get-CFreeBytes
Write-Log "Starting C: maintenance. Free space: $(Format-Bytes $startFree). Target: $(Format-Bytes $TargetFreeBytes)."

if ($startFree -ge $TargetFreeBytes) {
    Write-Log "C: already meets the free-space target. No changes needed."
    exit 0
}

$tempCutoff = (Get-Date).AddDays(-$TempFileMinimumAgeDays)
$archiveCutoff = (Get-Date).AddDays(-$ArchiveMinimumAgeDays)
$userProfile = [Environment]::GetFolderPath("UserProfile")

$tempRoots = @(
    $env:TEMP,
    "$env:WINDIR\Temp",
    (Join-Path $userProfile "AppData\Local\Temp"),
    (Join-Path $userProfile "AppData\Local\Microsoft\Windows\INetCache"),
    (Join-Path $userProfile "AppData\Local\Microsoft\Edge\User Data\Default\Cache"),
    (Join-Path $userProfile "AppData\Local\Google\Chrome\User Data\Default\Cache")
) | Select-Object -Unique

foreach ($root in $tempRoots) {
    Remove-OldItems -Root $root -OlderThan $tempCutoff
}

try {
    Clear-RecycleBin -DriveLetter C -Force -ErrorAction Stop
    Write-Log "Emptied C: Recycle Bin."
} catch {
    Write-Log "Skipped C: Recycle Bin cleanup :: $($_.Exception.Message)"
}

if ((Get-CFreeBytes) -lt $TargetFreeBytes) {
    $archiveRoots = @(
        (Join-Path $userProfile "Downloads"),
        (Join-Path $userProfile "Desktop"),
        (Join-Path $userProfile "Documents"),
        (Join-Path $userProfile "Pictures"),
        (Join-Path $userProfile "Videos"),
        (Join-Path $userProfile "Music")
    ) | Select-Object -Unique
    Move-ArchiveCandidates -Roots $archiveRoots -OlderThan $archiveCutoff
    Remove-EmptyDirectories -Roots $archiveRoots
}

$endFree = Get-CFreeBytes
Write-Log "Finished C: maintenance. Free space: $(Format-Bytes $endFree). Recovered: $(Format-Bytes ($endFree - $startFree))."

if ($endFree -lt $TargetFreeBytes) {
    Write-Log "WARNING: C: is still below target. Consider moving more personal files to D: or expanding the archive roots in this script."
    exit 2
}

exit 0
