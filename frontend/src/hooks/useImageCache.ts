/*src/hooks/useImageCache.ts*/

import type { Painting } from '@/api/api-cards';
import { cacheImage } from '@/utils/imageCache';
import { useEffect, useState } from 'react';

export const useImageCache = (paintings: Painting[]) => {
  const [isImagesLoaded, setIsImagesLoaded] = useState<boolean>(true);

  useEffect(() => {
    if (paintings.length === 0) {
      return;
    }

    setIsImagesLoaded(true);

    const promises = paintings.map((p) => {
      const url = `https://test-front.framework.team${p.imageUrl}`;
      return cacheImage(url);
    });

    Promise.allSettled(promises).then(() => setIsImagesLoaded(false));
  }, [paintings]);

  return isImagesLoaded;
};
