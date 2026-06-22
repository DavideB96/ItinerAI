import Image from "next/image";

export default function CoverImage({ src, alt, nome, className = "" }) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-amber-300 to-accent ${className}`}>
      <svg className="absolute -right-4 -top-4 h-24 w-24 rotate-12 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2-7H6l-2 3H1l2-5-2-5h3l2 3h5l-2-7h3z" />
      </svg>
      <span className="z-10 px-3 text-center text-xl font-bold text-white drop-shadow">
        {nome}
      </span>
    </div>
  );
}