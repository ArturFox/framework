/* src/semantics/footer/footer.tsx */

import { useMemo } from 'react'
import { useGetAllPaintingsQuery } from '@/api/api-cards'
import { Skeleton } from '@/components/ui/skeleton'
import { myStore } from '@/store/useStore'
import next from '../../assets/icons/back-next/Vector (1).svg'
import back from '../../assets/icons/back-next/Vector.svg'
import styles from '../../assets/styles/blocks/footer.module.scss'

export function Footer() {
  const page = myStore(state => state.page)
  const limit = myStore(state => state.limit)
  const search = myStore(state => state.search)
  const theme = myStore(state => state.theme)

  const isImagesLoading = myStore(state => state.isImagesLoading)
  const setPage = myStore(state => state.setPage)
  const maxVisible = 3
  const { data: paintingsResponse, isFetching: fetchingResponse } = useGetAllPaintingsQuery({
    page,
    limit,
    q: search,
  })

  const totalCount = paintingsResponse?.totalCount ?? 0
  const totalPages = Math.ceil(totalCount / limit)

  const pages = useMemo(() => {
    const start = Math.max(
      1,
      Math.min(page - Math.floor(maxVisible / 2), totalPages - maxVisible + 1),
    )
    const end = Math.min(totalPages, start + maxVisible - 1)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [page, totalPages, maxVisible])

  const goToPage = (newPage: number) => {
    setPage(Math.min(totalPages, Math.max(1, newPage)))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className={`${styles.footer} ${theme === 'light' ? styles.light : ''}`}
      role="navigation"
      aria-label="Pagination navigation"
    >
      {fetchingResponse || isImagesLoading
        ? (
            <div className={styles.skeleton}>
              <Skeleton className={styles.item} />
            </div>
          )
        : totalPages > 0
          ? (
              <nav className={styles.nav}>
                <ul className={styles.ul}>
                  <li className={styles.item} onClick={() => goToPage(page - 1)}>
                    <img alt="back" src={back} className={styles.img} />
                  </li>

                  {pages[0] > 1 && (
                    <>
                      <li className={styles.numbers} onClick={() => goToPage(1)}>
                        1
                      </li>
                      {pages[0] > 2 && <li className={styles.points}>…</li>}
                    </>
                  )}

                  {pages.map(p => (
                    <li
                      key={p}
                      className={`${styles.numbers} ${page === p ? styles.active : ''}`}
                      onClick={() => goToPage(p)}
                    >
                      {p}
                    </li>
                  ))}

                  {pages.at(-1)! < totalPages && (
                    <>
                      {pages.at(-1)! < totalPages - 1 && <li className={styles.points}>…</li>}
                      <li className={styles.numbers} onClick={() => goToPage(totalPages)}>
                        {totalPages}
                      </li>
                    </>
                  )}

                  <li className={styles.item} onClick={() => goToPage(page + 1)}>
                    <img alt="next" src={next} className={styles.img} />
                  </li>
                </ul>
              </nav>
            )
          : (
              <></>
            )}
    </footer>
  )
}
