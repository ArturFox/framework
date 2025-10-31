/* src/semantics/main/many-card.tsx */

import type { Author, Location, Painting } from '@/api/api-cards'
import { myStore } from '@/store/useStore'
import styles from '../../assets/styles/blocks/many-card.module.scss'
import { OneCardM } from './one-card'

interface Props {
  paintings: Painting[]
  isFetching: boolean
  locations: Location[]
  authors: Author[]
  debouncedSearch: string
}

export function ManyCardM({
  paintings,
  isFetching,
  locations,
  authors,
  debouncedSearch,
}: Props) {
  const theme = myStore(state => state.theme)

  return (
    <section className={`${styles.gallery} ${theme === 'light' ? styles.light : ''} ${isFetching ? 'is-loading' : ''}`}>
      {paintings.length > 0
        ? (
            paintings.map((painting) => {
              const author = authors.find(a => a.id === painting.authorId)?.name || 'Unknown author'
              const location
                = locations.find(l => l.id === painting.locationId)?.location || 'Unknown locations'

              return (
                <OneCardM
                  key={painting.id}
                  name={painting.name}
                  created={painting.created}
                  imageUrl={painting.imageUrl}
                  authors={author}
                  locations={location}
                />
              )
            })
          )
        : (
            <div className={styles.notCards}>
              <h1 className={styles.h1}>
                No matches for
                <span className={styles.span}>{debouncedSearch}</span>
              </h1>

              <p className={styles.p}>
                Please try again with a different spelling or keywords.
              </p>
            </div>
          )}
    </section>
  )
}
