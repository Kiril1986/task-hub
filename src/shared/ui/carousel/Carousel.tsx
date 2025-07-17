import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  itemKey: (item: T) => string | number;
}

const CARD_WIDTH = 260;
const CARD_GAP = 8;

export function Carousel<T>({ items, renderItem, itemKey }: CarouselProps<T>) {
  const [visibleCards, setVisibleCards] = useState(3);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, items.length, onSelect]);

  useLayoutEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 1260) setVisibleCards(1);
      else if (width < 1460) setVisibleCards(2);
      else setVisibleCards(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="relative">
      <div
        ref={emblaRef}
        className="overflow-hidden transition-opacity duration-500 ml-0 sm:ml-6 lg:ml-14"
        style={{ width: `calc(${visibleCards} * ${CARD_WIDTH}px + ${(visibleCards - 1)} * ${CARD_GAP}px)` }}
      >
        <div className="flex gap-2 snap-x snap-mandatory">
          {items.map((item) => (
            <div
              key={itemKey(item)}
              className="flex-none snap-start transition-transform duration-500 ease-in-out"
              style={{ width: 'clamp(200px, 26vw, 260px)' }}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>

      {items.length > visibleCards && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!prevEnabled}
            className="absolute top-1/2 left-0 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-400 disabled:opacity-50 cursor-pointer"
            aria-label="Scroll left"
            type="button"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            disabled={!nextEnabled}
            className="absolute top-1/2 right-0 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-400 disabled:opacity-50 cursor-pointer"
            aria-label="Scroll right"
            type="button"
          >
            <ArrowRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}
