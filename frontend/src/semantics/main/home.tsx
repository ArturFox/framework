/* src/semantics/main/main.tsx */

import {
  useGetAllAuthorsQuery,
  useGetAllLocationsQuery,
  useGetAllPaintingsQuery,
} from '@/api/api-cards'
import { CardsSkeleton } from '@/components/cards/skeleton'
import { useDebounce } from '@/hooks/useDebounce'
import { useImageCache } from '@/hooks/useImageCache'
import { usePrefetchPaintings } from '@/hooks/usePrefetchPaintings'
import { myStore } from '@/store/useStore'
import searchIcon from '../../assets/icons/search/search.svg'
import styles from '../../assets/styles/blocks/home.module.scss'
import { ManyCardM } from './many-card'

export function HomePage() {
  const limit = myStore(state => state.limit)
  const page = myStore(state => state.page)
  const search = myStore(state => state.search)
  const isImagesLoading = myStore(state => state.isImagesLoading)
  const setSearch = myStore(state => state.setSearch)
  const setPage = myStore(state => state.setPage)
  const setIsImagesLoading = myStore(state => state.setIsImagesLoading)
  const theme = myStore(state => state.theme)

  const debouncedSearch = useDebounce(search, 400)

  const { data: paintingsResponse, isFetching } = useGetAllPaintingsQuery({
    page,
    limit,
    q: debouncedSearch,
  })
  const { data: authorsResponse } = useGetAllAuthorsQuery()
  const { data: locationsResponse } = useGetAllLocationsQuery()

  const locations = locationsResponse ?? []
  const authors = authorsResponse ?? []
  const paintings = paintingsResponse?.data ?? []

  const totalCount = paintingsResponse?.totalCount ?? 0
  const totalPages = Math.ceil(totalCount / limit)

  usePrefetchPaintings(page, totalPages, limit)

  const stateBoolean = useImageCache(paintings)

  if (!stateBoolean) {
    setIsImagesLoading(stateBoolean)
  }

  return (
    <main className={`${styles.home} ${theme === 'light' ? styles.light : ''}`}>
      <form className={styles.container} role="search" onSubmit={e => e.preventDefault()}>
        <div className={styles.div}>
          <img src={searchIcon} alt="search" className={styles.search} />

          <input
            placeholder="Painting title"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className={styles.input}
            aria-label="Search paintings"
            autoComplete="off"
          />
        </div>
      </form>

      <section>
        {isFetching || isImagesLoading
          ? (
              <CardsSkeleton limit={limit} />
            )
          : (
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
  )
}

export default HomePage
