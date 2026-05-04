import { type ImageCell, type MoviesResponse, type PeopleResponse, SEARCH_ENDPOINT, type TvResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

type SearchProps = {
  query: string;
};

export const SearchView = ({ query }: SearchProps) => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get('type');
  const { data } = useTmdb<MoviesResponse | TvResponse | PeopleResponse>(`${SEARCH_ENDPOINT}/${searchType}`, { query: query, page }, []);

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_name,
  }));

  return <></>;
};
