//PremiumCard.jsx
export default function EsCard({
  title,
  subtitle,
  children,
  footer,
  className = "",
}) {
  return (
    <section
      className={`
        group relative overflow-hidden
        rounded-[28px]
        border border-white/40
        bg-white/70 backdrop-blur-xl
        shadow-[0_10px_30px_rgba(0,0,0,0.08)]
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      <div className="relative p-8">
        {(title || subtitle) && (
          <header className="mb-6">
            {title && (
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
            )}
          </header>
        )}

        {/* Main content */}
        <div className="space-y-6">{children}</div>

        {/* Footer actions */}
        {footer && (
          <footer className="mt-8 flex justify-end gap-3">{footer}</footer>
        )}
      </div>
    </section>
  );
}