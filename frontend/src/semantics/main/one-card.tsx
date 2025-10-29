/* src/semantics/main/one-card.tsx */

interface Props {
  name: string;
  created: string;
  imageUrl: string;
  locations: string;
  authors: string;
}

export const OneCardM = ({ name, created, imageUrl, locations, authors }: Props) => {
  return (
    <section className="card">
      <img
        src={`https://test-front.framework.team${imageUrl}`}
        alt={name}
        className="card__img"
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          const retries = Number(img.dataset.retryCount ?? 0);

          if (retries < 3) {
            img.dataset.retryCount = String(retries + 1);
            img.src = `https://test-front.framework.team${imageUrl}?retry=${Date.now()}`;
          } else {
            img.src = '/placeholder.jpg';
          }
        }}
      />
      <div className="card__info">
        <div className="card__lateral">
          <span className="card__lateral-line"></span>
        </div>

        <div className="card__text">
          <div>
            <h2 className="card__title">{name}</h2>
            <p className="card__year">{created}</p>
          </div>

          <div>
            <h2 className="card__author">{authors}</h2>
            <p className="card__location">{locations}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
