import { Footer, Header } from '@/components';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-indigo-950 text-fuchsia-400">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};
