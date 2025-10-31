/* src/hooks/useImageCache.ts */

import type { Painting } from '@/api/api-cards'
import { useEffect, useState } from 'react'
import { cacheImage } from '@/utils/imageCache'

export function useImageCache(paintings: Painting[]) {
  const [isImagesLoaded, setIsImagesLoaded] = useState<boolean>(true)

  useEffect(() => {
    if (paintings.length === 0) {
      return
    }

    let cancelled = false

    const loadImages = async () => {
      if (!cancelled)
        setIsImagesLoaded(true)

      const promises = paintings.map(p => cacheImage(`https://test-front.framework.team${p.imageUrl}`))
      await Promise.allSettled(promises)

      if (!cancelled)
        setIsImagesLoaded(false)
    }

    loadImages()

    return () => {
      cancelled = true
    }
  }, [paintings])

  return isImagesLoaded
}
