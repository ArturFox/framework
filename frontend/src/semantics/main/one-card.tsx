/* src/semantics/main/one-card.tsx */

import { myStore } from '@/store/useStore'
import styles from '../../assets/styles/blocks/one-card.module.scss'

interface Props {
  name: string
  created: string
  imageUrl: string
  locations: string
  authors: string
}

export function OneCardM({ name, created, imageUrl, locations, authors }: Props) {
  const theme = myStore(state => state.theme)

  return (
    <section className={`${styles.card} ${theme === 'light' ? styles.light : ''}`}>
      <img
        src={`https://test-front.framework.team${imageUrl}`}
        alt={name}
        className={styles.img}
        onError={(e) => {
          const img = e.target as HTMLImageElement
          const retries = Number(img.dataset.retryCount ?? 0)

          if (retries < 3) {
            img.dataset.retryCount = String(retries + 1)
            img.src = `https://test-front.framework.team${imageUrl}?retry=${Date.now()}`
          }
          else {
            img.src = '/placeholder.jpg'
          }
        }}
      />
      <div className={styles.info}>
        <div className={styles.lateral}>
          <span className={styles.line}></span>
        </div>

        <div className={styles.text}>
          <div>
            <h2 className={styles.title}>{name}</h2>
            <p className={styles.year}>{created}</p>
          </div>

          <div>
            <h2 className={styles.author}>{authors}</h2>
            <p className={styles.location}>{locations}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
