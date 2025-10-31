/* src/components/cards/CardsSkeleton.tsx */

import styles from '@/assets/styles/blocks/cards-skeleton.module.scss'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  limit: number
}

export function CardsSkeleton({ limit = 4 }: Props) {
  return (
    <section className={styles.gallery}>
      {Array.from({ length: limit }).map(() => (
        <div key={crypto.randomUUID()} className={styles.card}>
          <Skeleton className={styles.img} />
          <div className={styles.info}>
            <div className={styles.text}>
              <div>
                <div className={styles.title}></div>
                <div className={styles.year}></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
