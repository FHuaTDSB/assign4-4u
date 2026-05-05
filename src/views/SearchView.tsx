import { Gallery, Pagination } from '@/components';
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

  const { data } = useTmdb<MoviesResponse | TvResponse | PeopleResponse>(`${SEARCH_ENDPOINT}/${searchType}`, { query: query, page }, [
    query,
    searchType,
    page
  ]);

  const gridData: ImageCell[] =
    searchType == 'movie'
      ? (data?.results ?? []).map((result) => ({
          id: result.id,
          imagePath: result.poster_path,
          primaryText: result.original_title,
        }))
      : searchType == 'tv'
        ? (data?.results ?? []).map((result) => ({
            id: result.id,
            imagePath: result.poster_path,
            primaryText: result.original_name,
          }))
        : (data?.results ?? []).map((result) => ({
            id: result.id,
            imagePath: result.profile_path,
            primaryText: result.name,
          }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="text-2xl font-bold mb-6">Results</h2>
      {gridData.length ? (
        <>
          <Gallery
            results={gridData}
            onClick={(item) =>
              navigate(`/${searchType}/${item.id}/${searchType == 'movie' ? 'credits' : searchType == 'tv' ? 'seasons' : ''}`)
            }
          />
          <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />{' '}
        </>
      ) : (
        <p className="text-gray-400 text-center">No results available.</p>
      )}
    </section>
  );
};
