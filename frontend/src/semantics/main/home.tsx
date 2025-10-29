/* src/semantics/main/main.tsx */

import {
  useGetAllAuthorsQuery,
  useGetAllLocationsQuery,
  useGetAllPaintingsQuery,
} from '@/api/api-cards';
import { useDebounce } from '@/hooks/useDebounce';
import { useImageCache } from '@/hooks/useImageCache';
import { usePrefetchPaintings } from '@/hooks/usePrefetchPaintings';
import { myStore } from '@/store/useStore';
import { ManyCardM } from './many-card';
import { CardsSkeleton } from '@/components/cards/skeleton';
import searchIcon from '../../assets/icons/search/search.svg';

export const HomePage = () => {
  const limit = myStore((state) => state.limit);
  const page = myStore((state) => state.page);
  const search = myStore((state) => state.search);
  const isImagesLoading = myStore((state) => state.isImagesLoading);
  const setSearch = myStore((state) => state.setSearch);
  const setPage = myStore((state) => state.setPage);
  const setIsImagesLoading = myStore((state) => state.setIsImagesLoading);

  const debouncedSearch = useDebounce(search, 400);

  const { data: paintingsResponse, isFetching } = useGetAllPaintingsQuery({
    page,
    limit,
    q: debouncedSearch,
  });
  const { data: authorsResponse } = useGetAllAuthorsQuery();
  const { data: locationsResponse } = useGetAllLocationsQuery();

  const locations = locationsResponse ?? [];
  const authors = authorsResponse ?? [];
  const paintings = paintingsResponse?.data ?? [];

  const totalCount = paintingsResponse?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  usePrefetchPaintings(page, totalPages, limit);

  const stateBoolean = useImageCache(paintings);

  if (!stateBoolean) {
    setIsImagesLoading(stateBoolean);
  }

  return (
    <main className="home">
      <form className="home__container" role="search" onSubmit={(e) => e.preventDefault()}>
        <div className="home__container-div">
          <img src={searchIcon} alt="search" className="home__container-div-search" />

          <input
            placeholder="Painting title"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="home__container-div-input"
            aria-label="Search paintings"
            autoComplete="off"
          />
        </div>
      </form>

      <section>
        {isFetching || isImagesLoading ? (
          <CardsSkeleton limit={limit} />
        ) : (
          <ManyCardM
            paintings={paintings}
            isFetching={false}
            locations={locations}
            authors={authors}
            debouncedSearch={debouncedSearch}
          />
        )}
      </section>
    </main>
  );
};

export default HomePage;
