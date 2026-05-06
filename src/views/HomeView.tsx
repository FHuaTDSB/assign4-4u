import { Button } from '@/components';
import { useNavigate } from 'react-router-dom';

export const HomeView = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-indigo-950 text-white">
      <main className="flex flex-1 items-center justify-center">
        <section className="space-y-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight">Flickerpix V2</h1>
          <p className="text-lg text-gray-400">All your favourite movies and shows in one place!</p>
          <Button onClick={() => navigate('/movie/category/now_playing')}>Enter</Button>
        </section>
      </main>
      <footer className="p-5 text-center text-sm text-gray-500">Built with React, Vite and React Router</footer>
    </div>
  );
};
