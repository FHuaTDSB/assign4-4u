import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

type SearchProps = {
  query: string;
};

export const SearchView = ({ query }: SearchProps) => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get('type')
  console.log(searchType);
  //const { data } = useTmdb<MediaResponse>(SEARCH_ENDPOINT, { query: query, page }, []);

  return <></>;
};
