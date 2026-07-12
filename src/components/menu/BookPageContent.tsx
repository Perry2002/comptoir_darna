import type { BookMenuPageData } from '../../types'

function CoverPage({ data }: { data: BookMenuPageData }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-8 py-8 bg-surface-container-lowest">
      <span className="material-symbols-outlined text-3xl text-primary/50 mb-3" aria-hidden="true">
        restaurant_menu
      </span>
      <div className="w-10 h-px bg-primary/40 mb-3" />
      <p className="font-label-lg uppercase tracking-[0.3em] text-on-surface-variant/60 text-xs mb-4">
        {data.title}
      </p>
      <h2 className="font-display-lg italic text-primary text-3xl md:text-4xl leading-tight">
        {data.subtitle}
      </h2>
      <h3 className="font-display-lg text-on-surface text-xl md:text-2xl mt-1">{data.tagline}</h3>
      <div className="w-10 h-px bg-primary/40 my-4" />
      <p className="text-xs uppercase tracking-widest text-on-surface-variant/50">
        Hivernage — Marrakech
      </p>
    </div>
  )
}

function TocPage({ data, pageNumber }: { data: BookMenuPageData; pageNumber: number }) {
  return (
    <div className="h-full flex flex-col p-4 md:p-7 overflow-y-auto bg-surface-container-lowest">
      <h3 className="font-display-lg italic text-primary text-xl md:text-2xl mb-2">{data.title}</h3>
      <div className="w-10 h-px bg-primary/40 mb-3" />
      <ul className="space-y-2 flex-1">
        {data.items.map((item, i) => (
          <li key={i} className="flex items-baseline gap-2">
            <div>
              <span className="font-label-lg text-on-surface text-sm">{item.name}</span>
              {item.description && (
                <span className="text-on-surface-variant/50 text-[11px] uppercase tracking-wide ml-2">
                  {item.description}
                </span>
              )}
            </div>
            <span className="flex-1 border-b border-dotted border-outline-variant/60 translate-y-[-3px]" aria-hidden="true" />
            <span className="text-primary text-sm font-semibold">{item.price}</span>
          </li>
        ))}
      </ul>
      <div className="text-center text-[11px] text-on-surface-variant/40 mt-2">{pageNumber}</div>
    </div>
  )
}

export default function BookPageContent({
  data,
  pageNumber,
}: {
  data: BookMenuPageData
  pageNumber: number
}) {
  if (data.variant === 'cover') return <CoverPage data={data} />
  if (data.variant === 'toc') return <TocPage data={data} pageNumber={pageNumber} />

  return (
    <div className="h-full flex flex-col p-4 md:p-7 overflow-y-auto bg-surface-container-lowest">
      {data.section && (
        <span className="text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/50 mb-2">
          {data.section}
        </span>
      )}
      <h3 className="font-display-lg italic text-primary text-xl md:text-2xl mb-2 leading-snug">
        {data.title}
      </h3>
      <div className="w-10 h-px bg-primary/40 mb-3" />

      {data.priceColumns && (
        <div className="flex justify-end gap-4 text-[10px] uppercase tracking-wide text-on-surface-variant/60 mb-3">
          {data.priceColumns.map((c) => (
            <span key={c} className="w-12 text-right">
              {c}
            </span>
          ))}
        </div>
      )}

      <ul className="space-y-2.5 flex-1">
        {data.items.map((item, i) => (
          <li key={i}>
            <div className="flex items-baseline gap-2">
              <span className="font-label-lg text-on-surface text-sm md:text-base inline-flex items-center gap-1">
                {item.tag === 'veg' && (
                  <span
                    className="material-symbols-outlined text-[14px] text-green-700"
                    aria-label="Option végétarienne"
                  >
                    eco
                  </span>
                )}
                {item.tag === 'spicy' && (
                  <span
                    className="material-symbols-outlined text-[14px] text-red-700"
                    aria-label="Plat épicé"
                  >
                    local_fire_department
                  </span>
                )}
                {item.name}
              </span>
              <span
                className="flex-1 border-b border-dotted border-outline-variant/60 translate-y-[-3px]"
                aria-hidden="true"
              />
              {item.price && (
                <span className="text-primary text-sm md:text-base font-semibold whitespace-nowrap">
                  {item.price}
                </span>
              )}
              {item.prices && (
                <span className="text-primary text-xs md:text-sm font-semibold whitespace-nowrap flex gap-4">
                  {item.prices.map((p, pi) => (
                    <span key={pi} className="w-12 text-right inline-block">
                      {p}
                    </span>
                  ))}
                </span>
              )}
            </div>
            {item.description && (
              <p className="text-xs md:text-sm text-on-surface-variant/80 italic mt-0.5 pr-2">
                {item.description}
              </p>
            )}
          </li>
        ))}
      </ul>

      {data.note && (
        <p className="text-[11px] italic text-on-surface-variant/70 mt-3 pt-3 border-t border-outline-variant/20 leading-relaxed">
          {data.note}
        </p>
      )}

      <div className="text-center text-[11px] text-on-surface-variant/40 mt-2">{pageNumber}</div>
    </div>
  )
}
