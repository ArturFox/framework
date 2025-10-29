/*src/hooks/usePrefetchPaintings.ts*/

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPaintingsApi } from '@/api/api-cards';
import type { AppDispatch } from '@/store/all-cards';
import { cacheImage } from '@/utils/imageCache';

export const usePrefetchPaintings = (page: number, totalPages: number, limit: number) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (totalPages <= 1) {
      return;
    }

    const nexPage = page + 1;

    if (nexPage > totalPages) {
      return;
    }

    const promise = dispatch(
      getPaintingsApi.endpoints.getAllPaintings.initiate({ page: nexPage, limit }),
    );

    promise.unwrap().then((response) => {
      response.data.forEach((painting) => {
        const url = `https://test-front.framework.team${painting.imageUrl}`;
        cacheImage(url);
      });
    });

    return () => {
      promise.unsubscribe();
    };
  }, [page, totalPages, dispatch, limit]);
};
