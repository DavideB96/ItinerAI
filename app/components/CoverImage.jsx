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
    <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-300 to-accent ${className}`}>
      <span className="px-3 text-center text-xl font-bold text-white drop-shadow">
        {nome}
      </span>
    </div>
  );
}