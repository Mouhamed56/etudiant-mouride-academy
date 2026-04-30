export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen gradient-overlay pattern-bg flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img src="/images/logo.png" alt="EMA" className="w-28 h-28 object-contain drop-shadow-xl" />
        </div>
        {children}
      </div>
    </div>
  )
}
