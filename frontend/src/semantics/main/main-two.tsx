/* src/semantics/main/main.tsx */

import { useState } from 'react';
import { useGetAllPaintingsQuery, useGetAllAuthorsQuery, useGetAllLocationsQuery } from '@/api/all-cards-api';
import { PaginationM } from './pagination';
import { ManyCardM } from './many-card';
import { useDebounce } from '@/hooks/useDebounce';
import { usePrefetchPaintings } from '@/hooks/usePrefetchPaintings';
import { useImageCache } from '@/hooks/useImageCache';
import { CardsSkeleton } from '@/components/cards/cards-skeleton';


const HomePage = () => {

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState('');
  const limit = 6;
  
 

  const debouncedSearch = useDebounce(search, 400);

  const { data: paintingsResponse, isFetching } = useGetAllPaintingsQuery({
    page,
    limit,
    q: debouncedSearch,
  });

  const {data: authorsResponse} = useGetAllAuthorsQuery();
  const {data: locationsResponse} = useGetAllLocationsQuery();

  const locations = locationsResponse ?? [];
  const authors = authorsResponse ?? [];

  const paintings = paintingsResponse?.data ?? [];
  const totalCount = paintingsResponse?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  usePrefetchPaintings(page, totalPages, limit);

  const isImagesLoading = useImageCache(paintings);

  return (
    <main className='home'>
      
      <div className="inputM">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Painting title"
          className="inputM__true"
        />
      </div>


      <section className='home__ss'>

        {(isFetching || isImagesLoading)
          ? <CardsSkeleton limit={limit} />
          : <ManyCardM 
              paintings={paintings} 
              isFetching={false} 
              locations={locations}
              authors={authors}
            />
        }

        <PaginationM page={page} setPage={setPage} totalPages={totalPages} />
      
      </section>

    </main>
  );
};

export default HomePage;