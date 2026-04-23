import { LinkGroup, Pagination } from '@/components';
import { Gallery } from '@/components';
import { TV_ENDPOINT } from '@/core/constants';
import type { TvResponse } from '@/core/types';
import { useTmdb } from '@/hooks/useTmdb';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const TelevisionView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const location = useLocation()
  const category: string = location.pathname.slice(location.pathname.lastIndexOf("/") + 1);
  const { data } = useTmdb<TvResponse>(`${TV_ENDPOINT}/${category}`, { page }, [page]);
  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_name,
  }));
  console.log(category)

  if (!data) {
    return <p className="text-center text-cyan-700">Loading...</p>;
  }

  return (
    <section className="py-5 px-10 flex flex-col gap-4">
      <LinkGroup
        options={[
          { label: 'Airing Today', to: '/tv/category/airing_today' },
          { label: 'On The Air', to: '/tv/category/on_the_air' },
          { label: 'Popular', to: '/tv/category/popular' },
          { label: 'Top Rated', to: '/tv/category/top_rated' },
        ]}
      />
      <Gallery results={gridData} onClick={(id) => navigate(`/tv/${id}/seasons`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
