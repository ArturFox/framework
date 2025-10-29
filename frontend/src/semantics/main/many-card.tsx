/* src/semantics/main/many-card.tsx */

import { OneCardM } from './one-card';
import type { Painting, Location, Author } from '@/api/api-cards';

interface Props {
  paintings: Painting[];
  isFetching: boolean;
  locations: Location[];
  authors: Author[];
  debouncedSearch: string;
}

export const ManyCardM = ({
  paintings,
  isFetching,
  locations,
  authors,
  debouncedSearch,
}: Props) => {
  return (
    <section className={`gallery ${isFetching ? 'is-loading' : ''}`}>
      {paintings.length > 0 ? (
        paintings.map((painting) => {
          const author = authors.find((a) => a.id === painting.authorId)?.name || 'Unknown author';
          const location =
            locations.find((l) => l.id === painting.locationId)?.location || 'Unknown locations';

          return (
            <OneCardM
              key={painting.id}
              name={painting.name}
              created={painting.created}
              imageUrl={painting.imageUrl}
              authors={author}
              locations={location}
            />
          );
        })
      ) : (
        <div className="gallery__notCards">
          <h1 className="gallery__notCards-h1">
            No matches for
            <span className="gallery__notCards-span">{debouncedSearch}</span>
          </h1>

          <p className="gallery__notCards-p">
            Please try again with a different spelling or keywords.
          </p>
        </div>
      )}
    </section>
  );
};
