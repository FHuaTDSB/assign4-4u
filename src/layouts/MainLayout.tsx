import { Outlet } from 'react-router-dom';
import { Footer, Header } from '@/components';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-indigo-950 text-fuchsia-400">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
