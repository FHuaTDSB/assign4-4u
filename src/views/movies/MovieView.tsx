import { LinkGroup, Modal } from '@/components';
import { type MediaResponse, IMAGE_BASE_URL, MOVIE_ENDPOINT, ORIGINAL_IMAGE_BASE_URL, TV_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { FaCalendarAlt } from 'react-icons/fa';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

export const MovieView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let media = location.pathname.slice(location.pathname.indexOf('/') + 1);
  media = media.slice(0, media.indexOf('/'));
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
          { label: 'Seasons', to: 'seasons' },
          { label: 'Credits', to: 'credits' },
          { label: 'Trailers', to: 'trailers' },
          { label: 'Reviews', to: 'reviews' },
        ];

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="p-5 space-y-5">
        <div
          className="h-[420px] bg-cover bg-center rounded-2xl"
          style={{
            backgroundImage: `url(${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path})`,
          }}
        />
        <div className="flex gap-8">
          <img className="w-[220px] h-[330px] object-cover rounded-xl" src={`${IMAGE_BASE_URL}${data.poster_path}`} alt={data.title} />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <p className="text-gray-400 flex items-center gap-2">
              <FaCalendarAlt />
              {data.release_date}
            </p>
            <p className="text-gray-300">{data.overview}</p>
            <LinkGroup
              options={links}
            />
          </div>
        </div>
        <Outlet />
      </div>
    </Modal>
  );
};
