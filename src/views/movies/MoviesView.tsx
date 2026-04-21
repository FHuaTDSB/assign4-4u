import { API_KEY, MOVIE_ENDPOINT } from '@/core/constants';
import type { MoviesResponse } from '@/core/types';
import { useTmdb } from '@/hooks/useTMDB';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const MoviesView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'now_playing';
  const { data } = useTmdb<MoviesResponse>(`${MOVIE_ENDPOINT}/${category}`, { page }, [page]);
  console.log(import.meta.env.SOME_KEY)

  return <></>;
};
