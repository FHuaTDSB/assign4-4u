import { Button, Gallery } from '@/components';
import { type EpisodesResponse, IMAGE_BASE_URL, type ImageCell, TV_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

export const EpisodeView = () => {
  const navigate = useNavigate();
  const { id, season } = useParams();
  const { data } = useTmdb<EpisodesResponse>(`${TV_ENDPOINT}/${id}/season/${season}`, {}, []);

  const gridData: ImageCell[] = (data?.episodes ?? []).map((result) => ({
    id: result.id,
    imagePath: `${IMAGE_BASE_URL}${result.still_path}`,
    primaryText: result.name,
    secondaryText: result.air_date,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <Button onClick={() => navigate(-1)}>
        <div className="flex items-center gap-2">
          <FaLongArrowAltLeft /> Back
        </div>
      </Button>
      <h2 className="text-2xl font-bold mb-6">Season {data.season_number}</h2>
      {data.episodes.length ? <Gallery results={gridData} /> : <p className="text-gray-400 text-center">No seasons available.</p>}
    </section>
  );
};
