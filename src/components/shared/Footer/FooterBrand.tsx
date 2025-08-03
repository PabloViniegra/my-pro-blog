import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export function FooterBrand() {
  return (
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
  )
}
