/* src/semantics/footer/footer.tsx */

import { useGetAllPaintingsQuery } from '@/api/api-cards';
import { Skeleton } from '@/components/ui/skeleton';
import { myStore } from '@/store/useStore';
import { useMemo } from 'react';
import next from '../../assets/icons/back-next/Vector (1).svg';
import back from '../../assets/icons/back-next/Vector.svg';

export const Footer = () => {
  const page = myStore((state) => state.page);
  const limit = myStore((state) => state.limit);
  const search = myStore((state) => state.search);

  const isImagesLoading = myStore((state) => state.isImagesLoading);
  const setPage = myStore((state) => state.setPage);
  const maxVisible = 3;
  const { data: paintingsResponse, isFetching: fetchingResponse } = useGetAllPaintingsQuery({
    page,
    limit,
    q: search,
  });

  const totalCount = paintingsResponse?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  const pages = useMemo(() => {
    const start = Math.max(
      1,
      Math.min(page - Math.floor(maxVisible / 2), totalPages - maxVisible + 1),
    );
    const end = Math.min(totalPages, start + maxVisible - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, totalPages, maxVisible]);

  const goToPage = (newPage: number) => {
    setPage(Math.min(totalPages, Math.max(1, newPage)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="navigation" aria-label="Pagination navigation">
      {fetchingResponse || isImagesLoading ? (
        <div className="footer__skeleton">
          <Skeleton className="footer__skeleton-item" />
        </div>
      ) : totalPages > 0 ? (
        <nav className="footer__nav">
          <ul className="footer__nav-ul">
            <li className="footer__nav-item" onClick={() => goToPage(page - 1)}>
              <img alt="back" src={back} className="img" />
            </li>

            {pages[0] > 1 && (
              <>
                <li className="footer__nav-numbers" onClick={() => goToPage(1)}>
                  1
                </li>
                {pages[0] > 2 && <li className="footer__nav-points">…</li>}
              </>
            )}

            {pages.map((p) => (
              <li
                key={p}
                className={`footer__nav-numbers ${page === p ? 'footer__nav-numbers-active' : ''}`}
                onClick={() => goToPage(p)}
              >
                {p}
              </li>
            ))}

            {pages.at(-1)! < totalPages && (
              <>
                {pages.at(-1)! < totalPages - 1 && <li className="footer__nav-points">…</li>}
                <li className="footer__nav-numbers" onClick={() => goToPage(totalPages)}>
                  {totalPages}
                </li>
              </>
            )}

            <li className="footer__nav-item" onClick={() => goToPage(page + 1)}>
              <img alt="next" src={next} className="img" />
            </li>
          </ul>
        </nav>
      ) : (
        <></>
      )}
    </footer>
  );
};
