/* src/components/cards/CardsSkeleton.tsx */

import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  limit: number;
}

export const CardsSkeleton = ({ limit = 4 }: Props) => {
  return (
    <section className="gallery">
      {Array.from({ length: limit }).map((_, i) => (
        <div key={i} className="card">
          <Skeleton className="card__img skeleton-img" />

          <div className="card__info skeleton-info">
            <div className="card__text skeleton-text">
              <div>
                <div className="card__title skeleton-title"></div>
                <div className="card__year skeleton-year"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
