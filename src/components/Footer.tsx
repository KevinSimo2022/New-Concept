const links = [
  { label: "Research", href: "#research" },
  { label: "GitHub", href: "#" },
  { label: "Product Hunt", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-bg border-t border-border">
      <div className="mx-auto max-w-content px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-start">
        <div className="flex flex-col gap-1">
          <span className="text-white text-xl font-semibold tracking-tight">
            PNGD™
          </span>
          <span className="text-sm text-muted-300">Built by Kevin</span>
        </div>

        <div className="flex justify-center">
          <p className="italic text-sm leading-relaxed text-center max-w-[400px] text-muted-100">
            &ldquo;We got you to read the fine print on a ping sound.
            Imagine what we can do for your brand.&rdquo;
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-border py-3 flex justify-center">
        <span className="text-[11px] text-muted-300">* Adobe Audition</span>
      </div>
    </footer>
  );
}
