import { Footer, Header } from '@/components';
import { Outlet } from 'react-router-dom';

type MainLayoutProps = {
  query: string;
  setQuery: (value: string) => void;
  searchParams: URLSearchParams;
  setSearchParams: (value: URLSearchParams) => void;
};

export const MainLayout = ({ query, setQuery, searchParams, setSearchParams }: MainLayoutProps) => {
  return (
    <>
      <div className="min-h-screen bg-indigo-950 text-fuchsia-400">
        <Header query={query} onChange={setQuery} searchParams={searchParams} setSearchParams={setSearchParams}/>
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};
