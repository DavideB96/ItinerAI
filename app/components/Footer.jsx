export default function Footer() {
  return (
    <footer className="bg-[#2c2418] px-6 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">

        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF9F27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2-7H6l-2 3H1l2-5-2-5h3l2 3h5l-2-7h3z" /></svg>
            <span className="font-bold text-amber-200">ItinerAI</span>
          </div>
          <p className="mt-1 text-xs text-amber-100/60">© 2026 Davide Bianchi · Powered by Gemini &amp; Unsplash</p>
        </div>

        <div className="flex gap-3">
          <a href="https://github.com/DavideB96" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-amber-50 transition-colors hover:bg-white/20">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z"/></svg>
            GitHub
          </a>
          <a href="https://linkedin.com/in/davidebianchi96" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-amber-50 transition-colors hover:bg-white/20">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V9.99H5.67v8.35h2.67zM7 8.81a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zm11.34 9.53v-4.58c0-2.45-1.31-3.59-3.06-3.59-1.41 0-2.04.78-2.39 1.32v-1.13h-2.67c.04.75 0 8.35 0 8.35h2.67v-4.66c0-.24.02-.48.09-.65.19-.48.63-.97 1.36-.97.96 0 1.34.73 1.34 1.8v4.48h2.66z"/></svg>
            LinkedIn
          </a>
        </div>

      </div>
    </footer>
  );
}