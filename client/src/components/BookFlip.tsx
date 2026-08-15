import { useEffect, useRef, useState } from "react";
import { PageFlip } from "page-flip";

type BookFlipProps = {
  pages: Array<{ title: string; eyebrow: string; body: string }>;
};

export function BookFlip({ pages }: BookFlipProps) {
  const host = useRef<HTMLDivElement>(null);
  const flip = useRef<PageFlip | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!host.current) return;
    const nodes = host.current.querySelectorAll(".physical-book-page");
    const book = new PageFlip(host.current, {
      width: 580, height: 720, size: "stretch",
      minWidth: 290, maxWidth: 720, minHeight: 420, maxHeight: 900,
      showCover: true, drawShadow: true, maxShadowOpacity: 0.42,
      mobileScrollSupport: false, flippingTime: 850, usePortrait: true,
    });
    book.loadFromHTML(nodes);
    book.on("flip", (event: { data: number }) => setCurrent(event.data));
    flip.current = book;
    return () => { book.destroy(); flip.current = null; };
  }, [pages]);

  return <section className="physical-book-shell" dir="rtl">
    <div className="physical-book-controls">
      <button onClick={() => flip.current?.flipPrev()} disabled={current === 0}>السابق</button>
      <span>الصفحة {current + 1} / {pages.length}</span>
      <button onClick={() => flip.current?.flipNext()} disabled={current === pages.length - 1}>التالي</button>
    </div>
    <div ref={host} className="physical-book">
      {pages.map((page, index) => <article key={page.title} className="physical-book-page">
        <span>المشهد {String(index + 1).padStart(2, "0")}</span>
        <small>{page.eyebrow}</small>
        <h2>{page.title}</h2>
        <p>{page.body}</p>
      </article>)}
    </div>
  </section>;
}
