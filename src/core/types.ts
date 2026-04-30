export type MoviesResponse = {
  results: Array<{
    id: number;
    original_title: string;
    poster_path: string;
  }>;
  total_pages: number;
};

export type TvResponse = {
  results: Array<{
    id: number;
    original_name: string;
    poster_path: string;
  }>;
  total_pages: number;
};

export type ImageCell = {
  id: number;
  imagePath: string;
  primaryText: string;
};

export type Genre = {
  name: string;
  label: string;
  id: number;
};

export type MediaResponse = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: string;
  results: Array<{
    id: number;
    original_title: string;
    poster_path: string;
  }>;
  total_pages: number;
};

export type CreditsResponse = {
  cast: Array<{
    id: number;
    name: string;
    profile_path: string;
    character: string;
  }>;
};

export type ReviewsResponse = {
  results: Array<{
    id: string;
    author: string;
    content: string;
  }>;
};

export type TrailersResponse = {
  results: Array<{
    key: string;
    name: string;
    site: string;
    type: string;
  }>;
};
