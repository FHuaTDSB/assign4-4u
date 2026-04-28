import { Gallery, LinkGroup, Pagination } from '@/components';
import { GENRE_ENDPOINT } from '@/core/constants';
import type { Genre, MoviesResponse, TvResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const GenreView = () => {
  const movieGenres: Genre[] = [
    { name: 'action', label: 'Action', id: 28 },
    { name: 'adventure', label: 'Adventure', id: 12 },
    { name: 'animation', label: 'Animation', id: 16 },
    { name: 'crime', label: 'Crime', id: 80 },
    { name: 'family', label: 'Family', id: 10751 },
    { name: 'fantasy', label: 'Fantasy', id: 14 },
    { name: 'history', label: 'History', id: 36 },
    { name: 'horror', label: 'Horror', id: 27 },
    { name: 'mystery', label: 'Mystery', id: 9648 },
    { name: 'sci-fi', label: 'Sci-Fi', id: 878 },
  ];
  const tvGenres = [
    { name: 'action', label: 'Action', id: 10759 },
    { name: 'animation', label: 'Animation', id: 16 },
    { name: 'comedy', label: 'Comedy', id: 35 },
    { name: 'crime', label: 'Crime', id: 80 },
    { name: 'documentary', label: 'Documentary', id: 99 },
    { name: 'drama', label: 'Drama', id: 18 },
    { name: 'family', label: 'Family', id: 10751 },
    { name: 'kids', label: 'Kids', id: 10762 },
    { name: 'mystery', label: 'Mystery', id: 9648 },
    { name: 'sci-fi', label: 'Sci-Fi', id: 10765 },
  ];

  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const location = useLocation();
  const media = location.pathname.slice(location.pathname.indexOf('genre') + 6, location.pathname.lastIndexOf('/'));
  const genre: string = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
  const findGenre = (value) => {
    return value.name == genre;
  };
  const selectedGenre = media == 'movie' ? movieGenres[movieGenres.findIndex(findGenre)].id : tvGenres[tvGenres.findIndex(findGenre)].id;
  const { data } = useTmdb<MoviesResponse | TvResponse>(`${GENRE_ENDPOINT}/${media}`, { page, with_genres: selectedGenre }, [
    page,
    selectedGenre,
  ]);
  const genreLinks =
    media == 'movie'
      ? movieGenres.map((movieGenre) => ({ label: movieGenre.label, to: `/genre/movie/${movieGenre.name}` }))
      : tvGenres.map((tvGenre) => ({ label: tvGenre.label, to: `/genre/tv/${tvGenre.name}` }));

  const gridData =
    media == 'movie'
      ? (data?.results ?? []).map((result) => ({
          id: result.id,
          imagePath: result.poster_path,
          primaryText: result.original_title,
        }))
      : (data?.results ?? []).map((result) => ({
          id: result.id,
          imagePath: result.poster_path,
          primaryText: result.original_name,
        }));

  if (!data) {
    return <p className="text-center text-cyan-700">Loading...</p>;
  }

  return (
    <section className="py-5 px-10 flex flex-col gap-4">
      <LinkGroup
        options={[
          { label: 'Movie', to: '/genre/movie/action', match: ['/genre/movie'] },
          { label: 'TV', to: '/genre/tv/action', match: ['/genre/tv'] },
        ]}
      />
      <LinkGroup options={genreLinks} />
      <Gallery results={gridData} onClick={(item) => navigate(`/${media}/${item.id}/${media == 'movie' ? 'credits' : 'seasons'}`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
