interface Props { children: React.ReactNode; className?: string }

export default function PageWrapper({ children, className = '' }: Props) {
  return (
    <div className={`max-w-7xl mx-auto px-4 md:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
