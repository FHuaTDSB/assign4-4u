export type MoviesResponse = {
    results: Array<{
      id: number;
      original_title: string;
      poster_path: string;
    }>;
    total_pages: number;
  };