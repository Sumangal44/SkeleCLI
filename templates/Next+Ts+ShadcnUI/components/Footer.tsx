import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p>{new Date().getFullYear()} skeleCLI </p>
          <p className="text-center text-sm leading-loose md:text-left">
            Built by <a href="https://devsumangal.netlify.app/" className="font-medium underline underline-offset-4">sumangal Karan</a>. Hosted on{' '}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            .
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/terms" className="text-sm underline underline-offset-4">Terms</Link>
          <Link href="/privacy" className="text-sm underline underline-offset-4">Privacy</Link>
        </div>
      </div>
    </footer>
  )
}

