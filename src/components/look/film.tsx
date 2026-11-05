/* eslint-disable @next/next/no-img-element */

/**
 * Filme do look em tela cheia (tela PRODUTO SCROLL 4). Enquanto os vídeos não chegam,
 * o quadro do filme se aproxima devagar com a rolagem; com `video`, o .mp4 toca mudo,
 * em loop, com o quadro como poster.
 */
export function Film({ poster, video, alt }: { poster: string; video?: string; alt: string }) {
  const small = poster.replace(/-2400\.webp$/, "-1600.webp");
  return (
    <section aria-label="Filme do look" className="px-[var(--pad)] pt-16 lg:pt-0">
      {/* Proporção do próprio quadro (4214 × 2348): a foto inteira, sem cortar a modelo. */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-panel md:aspect-[4214/2348]">
        {video ? (
          <video
            src={video}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            aria-label={alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <img
            data-zoom
            src={poster}
            srcSet={`${small} 1600w, ${poster} 2400w`}
            sizes="100vw"
            alt={alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
          />
        )}
      </div>
    </section>
  );
}
