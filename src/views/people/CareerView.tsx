import { Gallery } from '@/components';
import { PERSON_ENDPOINT, type CareerResponse, type ImageCell } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const CareerView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<CareerResponse>(`${PERSON_ENDPOINT}/${id}/movie_credits`, {}, []);

  const gridData: ImageCell[] = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="text-2xl font-bold mb-6">Career</h2>
      {data.cast.length ? (
        <Gallery results={gridData} onClick={(item) => navigate(`/movie/${item.id}/credits`)} />
      ) : (
        <p className="text-gray-400 text-center">No credits available.</p>
      )}
    </section>
  );
};
