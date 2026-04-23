import { ButtonGroup, Gallery, LinkGroup, Pagination } from '@/components';
import { TRENDING_ENDPOINT } from '@/core/constants';
import type { MoviesResponse, TvResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export const TrendingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const category: string = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
  const interval = searchParams.get('interval') || 'day';
  const { data } = useTmdb<MoviesResponse | TvResponse>(`${TRENDING_ENDPOINT}/${category}/${interval}`, { page, time_window: interval }, [
    page,
    interval,
  ]);

  const gridData =
    category == 'movie'
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
      <div className="flex justify-between">
        <LinkGroup
          options={[
            { label: 'Movie', to: '/trending/movie?interval=day' },
            { label: 'TV', to: '/trending/tv?interval=day' },
          ]}
        />
        <ButtonGroup
          value={interval}
          options={[
            { label: 'Today', value: 'day' },
            { label: 'Week', value: 'week' },
          ]}
          onClick={(value) => setSearchParams({ interval: value })}
        />
      </div>
      <Gallery results={gridData} onClick={(id) => navigate(`/${category}/${id}/${category == 'movie' ? 'credits' : 'seasons'}`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
