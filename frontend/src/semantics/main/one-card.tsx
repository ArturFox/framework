/* src/semantics/main/one-card.tsx */

import { Link } from "react-router-dom";

interface Props {
    name: string;
    created: string;
    imageUrl: string;
    id: number;
    locations: string; 
    authors: string;
};

export const OneCardM = ({name, created, imageUrl, id, locations, authors}: Props) => {

    return(
        <Link to={`/painting/${id}`} className="card">
            <img 
                src={`https://test-front.framework.team${imageUrl}`} 
                alt={name}
                className="card__img"
                
                onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    const retries = Number(img.dataset.retryCount ?? 0);

                    if(retries < 3) {
                        img.dataset.retryCount = String(retries + 1);
                        img.src = `https://test-front.framework.team${imageUrl}?retry=${Date.now()}`;
                    } else {
                        img.src = '/placeholder.jpg';
                    }
                }}
            />
            <div className="card__info">
                <div className="card__dot">
                    <span></span>
                </div>

                <div className="card__text">
                    <div>
                        <h1 className="card__title">{name}</h1>
                        <p className="card__year">{created}</p>
                    </div>

                    <div>
                        <h1 className="card__author">{authors}</h1>
                        <p className="card__location">{locations}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}