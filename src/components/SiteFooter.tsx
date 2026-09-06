export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <p className="site-footer__copy">
        © {year} ARC Studio. All rights reserved.
      </p>
    </footer>
  )
}
