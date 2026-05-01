import { Gallery } from '@/components';
import { type ImageCell, type SeasonsResponse, TV_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const SeasonsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {}, []);

  const gridData: ImageCell[] = (data?.seasons ?? []).map((result) => ({
    id: result.season_number,
    imagePath: result.poster_path,
    primaryText: result.name,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="text-2xl font-bold mb-6">Seasons</h2>
      {data.seasons.length ? (
        <Gallery results={gridData} onClick={(item) => navigate(`/tv/${id}/season/${item.id}`)} />
      ) : (
        <p className="text-gray-400 text-center">No seasons available.</p>
      )}
    </section>
  );
};
