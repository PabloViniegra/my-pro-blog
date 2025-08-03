import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/20 bg-background/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-lg font-bold font-sans text-foreground">
                My Pro Blog
              </span>
            </Link>
            <p className="text-muted-foreground font-sans text-sm leading-relaxed tracking-tight text-balance">
              Compartiendo conocimiento y experiencias sobre desarrollo web,
              tecnología y más.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/PabloViniegra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contacto@example.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
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

          <div className="space-y-4">
            <h3 className="font-sans font-semibold text-foreground text-md">
              Legal
            </h3>
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

          <div className="space-y-4">
            <h3 className="font-sans font-semibold text-foreground text-md">
              Contacto
            </h3>
            <ul className="space-y-2 font-serif">
              <li className="flex items-center space-x-2 text-muted-foreground font-sans text-sm">
                <Mail className="h-4 w-4" />
                <span>pablovpmadrid@gmail.com</span>
              </li>
              <li className="text-muted-foreground font-sans text-sm">
                <span>Madrid, España</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/20 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-muted-foreground font-sans text-sm">
              © {currentYear} My Pro Blog. Todos los derechos reservados.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <Link
                href="/rss"
                className="text-muted-foreground hover:text-foreground font-sans text-sm transition-colors"
              >
                RSS
              </Link>
              <Link
                href="/sitemap.xml"
                className="text-muted-foreground hover:text-foreground font-sans text-sm transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
