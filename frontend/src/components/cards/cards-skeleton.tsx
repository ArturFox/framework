/* src/components/cards/CardsSkeleton.tsx */

import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  limit: number;
};

export const CardsSkeleton = ({ limit = 4 }: Props) => {
  return (
    <section className="card">

      {Array.from({ length: limit }).map((_, i) => (

        <div key={i} className="">

          <Skeleton className="card__img" />

          <div className="card__info">
            <Skeleton className="card__title" />
            <Skeleton className="card__year" />
          </div>

        </div>

      ))}

    </section>
  );
};
