import { DetailItem, LinkGroup, Modal } from '@/components';
import { type MediaResponse, getBackdropUrl, getImageUrl, MOVIE_ENDPOINT, TV_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { FaCalendar, FaStar } from 'react-icons/fa';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

export const MovieView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const media = location.pathname.slice(location.pathname.indexOf('/') + 1, location.pathname.indexOf('/') + 2) == 'm' ? 'movie' : 'tv';
  const { id } = useParams();
  const { data } =
    media == 'movie'
      ? useTmdb<MediaResponse>(`${MOVIE_ENDPOINT}/${id}`, {}, [id])
      : useTmdb<MediaResponse>(`${TV_ENDPOINT}/${id}`, {}, [id]);
  const links =
    media == 'movie'
      ? [
          { label: 'Credits', to: 'credits' },
          { label: 'Trailers', to: 'trailers' },
          { label: 'Reviews', to: 'reviews' },
        ]
      : [
          { label: 'Seasons', to: 'seasons', match: ['/tv/:id/season/:season'] },
          { label: 'Credits', to: 'credits' },
          { label: 'Trailers', to: 'trailers' },
          { label: 'Reviews', to: 'reviews' },
        ];

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="grid grid-rows-[auto_1fr] h-full">
        <img className="w-full h-[240px] object-cover rounded-2xl" src={getBackdropUrl(data.backdrop_path)} alt={data.title} />
        <div className="grid grid-cols-[auto_1fr] gap-5 p-5 min-h-0">
          <img className="w-[200px] object-cover rounded-xl" src={getImageUrl(data.poster_path)} alt={data.title} />
          <div className="overflow-y-auto space-y-4">
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <p className="text-gray-300 leading-relaxed">{data.overview}</p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <DetailItem label="Release" value={data.release_date} icon={<FaCalendar />} />
              <DetailItem label="Rating" value={data.vote_average} icon={<FaStar />} />
            </div>
            <LinkGroup options={links} />
            <Outlet />
          </div>
        </div>
      </div>
    </Modal>
  );
};
