import { Gallery } from '@/components';
import { MOVIE_ENDPOINT, TV_ENDPOINT, type CreditsResponse, type ImageCell } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const CreditsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const media = location.pathname.slice(location.pathname.indexOf('/') + 1, location.pathname.indexOf('/') + 2) == 'm' ? 'movie' : 'tv';
  const { data } =
    media == 'movie'
      ? useTmdb<CreditsResponse>(`${MOVIE_ENDPOINT}/${id}/credits`, {}, [])
      : useTmdb<CreditsResponse>(`${TV_ENDPOINT}/${id}/credits`, {}, []);

  const gridData: ImageCell[] = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imagePath: result.profile_path,
    primaryText: result.name,
    secondaryText: result.character,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="text-2xl font-bold mb-6">Credits</h2>
      {data.cast.length ? (
        <Gallery results={gridData} onClick={(item) => navigate(`/person/${item.id}`)} />
      ) : (
        <p className="text-gray-400 text-center">No credits available.</p>
      )}
    </section>
  );
};
