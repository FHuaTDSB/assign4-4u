import { LinkGroup, Pagination } from '@/components';
import { Gallery } from '@/components';
import { MOVIE_ENDPOINT } from '@/core/constants';
import type { MoviesResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const MoviesView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const location = useLocation()
  const category: string = location.pathname.slice(location.pathname.lastIndexOf("/") + 1);
  const { data } = useTmdb<MoviesResponse>(`${MOVIE_ENDPOINT}/${category}`, { page }, [page]);
  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title,
  }));
  console.log(category)

  if (!data) {
    return <p className="text-center text-cyan-700">Loading...</p>;
  }

  return (
    <section className="py-5 px-10 flex flex-col gap-4">
      <LinkGroup
        options={[
          { label: 'Now Playing', to: '/movies/category/now_playing' },
          { label: 'Popular', to: '/movies/category/popular' },
          { label: 'Top Rated', to: '/movies/category/top_rated' },
          { label: 'Upcoming', to: '/movies/category/upcoming' },
        ]}
      />
      <Gallery results={gridData} onClick={(id) => navigate(`/movie/${id}/credits`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
