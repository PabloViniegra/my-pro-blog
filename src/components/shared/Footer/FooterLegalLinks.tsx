import Link from 'next/link'

export function FooterLegalLinks() {
  return (
    <div className="space-y-4">
      <h3 className="font-sans font-semibold text-foreground text-md">Legal</h3>
      <ul className="space-y-2 font-serif">
        <li>
          <Link
            href="/privacidad"
            className="text-muted-foreground hover:text-foreground transition-colors font-sans text-sm"
          >
            Política de privacidad
          </Link>
        </li>
        <li>
          <Link
            href="/terminos"
            className="text-muted-foreground hover:text-foreground transition-colors font-sans text-sm"
          >
            Términos de servicio
          </Link>
        </li>
        <li>
          <Link
            href="/cookies"
            className="text-muted-foreground hover:text-foreground transition-colors font-sans text-sm"
          >
            Política de cookies
          </Link>
        </li>
      </ul>
    </div>
  )
}
