import { Footer, Header } from '@/components';
import { Outlet } from 'react-router-dom';

type MainLayoutProps = {
  query: string;
  setQuery: (value: string) => void;
  setType: (value: string) => void;
  type: string
};

export const MainLayout = ({ query, setQuery, setType, type }: MainLayoutProps) => {
  return (
    <>
      <div className="min-h-screen bg-indigo-950 text-fuchsia-400">
        <Header query={query} onChange={setQuery} setType={setType} type={type}/>
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};
