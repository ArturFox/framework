import { useParams } from 'react-router-dom';
import { useGetAllPaintingsQuery } from '@/api/all-cards-api';

export default function PaintingPage() {
  const { id } = useParams();
  const { data } = useGetAllPaintingsQuery({ q: '', page: 1, limit: 100 });

  const painting = data?.data.find((p) => p.id === Number(id));

  if (!painting) {
    return <div className="p-4">Картина не найдена</div>;
  }

  return (
    <div className="p-4">
      <img
        src={`https://test-front.framework.team${painting.imageUrl}`}
        alt={painting.name}
        className="w-full max-w-[600px] rounded mb-4"
      />
      <h1 className="text-2xl font-semibold">{painting.name}</h1>
      <p className="text-gray-600 mt-2">Год: {painting.created}</p>
    </div>
  );
}
