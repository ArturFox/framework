import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface Props {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  maxVisible?: number;
}

export const PaginationM = ({page, setPage, totalPages, maxVisible = 3}: Props) => {
    
    

  const getPages = () => {

    const pages = [];
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPages();

    return(
        <Pagination>
            <PaginationContent>

                <PaginationItem>
                    <PaginationPrevious onClick={() => setPage(Math.max(1, page - 1))}>
                        
                    </PaginationPrevious>
                </PaginationItem>

                {pages[0] > 1 && (

                    <>
                        <PaginationItem>

                        <PaginationLink onClick={() => setPage(1)} isActive={page === 1}>
                            1
                        </PaginationLink>

                        </PaginationItem>

                        
                    </>

                )}

                {pages.map((p) => (

          <PaginationItem key={p}>

            <PaginationLink onClick={() => setPage(p)} isActive={page === p}>
              {p}
            </PaginationLink>

          </PaginationItem>

        ))}

        {pages[pages.length - 1] < totalPages && (

          <>

            {pages[pages.length - 1] < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>

              <PaginationLink
                onClick={() => setPage(totalPages)}
                isActive={page === totalPages}
              >
                {totalPages}
              </PaginationLink>
              
            </PaginationItem>

          </>

        )}



                <PaginationItem>
                    <PaginationNext onClick={() => setPage(Math.min(totalPages, page + 1))}>

                    </PaginationNext>
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    )
}