import Link from 'next/link'

export function FooterLinks() {
  return (
    <div className="space-y-4">
      <h3 className="font-sans font-semibold text-foreground text-md">
        Explorar
      </h3>
      <ul className="space-y-2 font-serif">
        <li>
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground transition-colors font-sans text-sm"
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            href="/categorias"
            className="text-muted-foreground hover:text-foreground transition-colors font-sans text-sm"
          >
            Categorías
          </Link>
        </li>
        <li>
          <Link
            href="/etiquetas"
            className="text-muted-foreground hover:text-foreground transition-colors font-sans text-sm"
          >
            Etiquetas
          </Link>
        </li>
        <li>
          <Link
            href="/sobre-mi"
            className="text-muted-foreground hover:text-foreground transition-colors font-sans text-sm"
          >
            Sobre mí
          </Link>
        </li>
      </ul>
    </div>
  )
}
