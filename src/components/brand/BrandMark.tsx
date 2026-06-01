import Image from 'next/image'

interface Props {
  size?: number
  className?: string
  priority?: boolean
}

export default function BrandMark({ size = 28, className = '', priority = false }: Props) {
  return (
    <Image
      src="/brand-mark.png"
      alt="MacroLibrium"
      width={size}
      height={size}
      priority={priority}
      className={`object-contain ${className}`}
    />
  )
}
