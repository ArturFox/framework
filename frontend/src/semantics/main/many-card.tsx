/* src/semantics/main/many-card.tsx */

import { OneCardM } from "./one-card";
import type { Painting, Location, Author } from "@/api/all-cards-api";

interface Props {
    paintings: Painting[];
    isFetching: boolean;
    locations: Location[];
    authors: Author[];
}

export const ManyCardM = ({paintings, isFetching, locations, authors}: Props) => {    

    return(
        <section 
            className={`gallery ${isFetching ? 'is-loading' : ''}`}
        >
            {paintings.map((painting) => {
                const author = authors.find((a) => a.id === painting.authorId)?.name || 'Unknown author';
                const location = locations.find((l) => l.id === painting.locationId)?.location || 'Unknown locations';

                return(
                    
                    <OneCardM 
                        key={painting.id}
                        name={painting.name}
                        created={painting.created}
                        imageUrl={painting.imageUrl}
                        id={painting.id}
                        authors={author}
                        locations={location}
                    />
                )
            })}

            
        </section>
    )
}