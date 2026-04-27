import { ButtonGroup } from '@/components/ButtonGroup';
import { LinkGroup } from '@/components/LinkGroup';
import { Link, useSearchParams } from 'react-router-dom';

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type') || 'movie';

  return (
    <header>
      <nav className="flex p-4 bg-purple-950 justify-between">
        <div className="flex gap-8">
          <Link to="/" className="flex gap-2 items-center">
            <img src="/src/assets/logo.png" alt="FlickerPix Logo" className="h-10" />
            <h1 className="text-3xl font-bold border-l-3 border-cyan-300 pl-2">Flickerpix</h1>
          </Link>
          <LinkGroup
            options={[
              { label: 'Movie', to: '/movie/category/now_playing', match: ['/movie'] },
              { label: 'TV', to: '/tv/category/airing_today', match: ['/tv'] },
              { label: 'Trending', to: '/trending/movie?interval=day', match: ['/trending'] },
              { label: 'Genre', to: '/genre/movie/action', match: ['/genre'] },
            ]}
          />
        </div>
        <div className="flex gap-4">
          <input
            type="search"
            className="flex-1 p-2 rounded-xl bg-indigo-950
                   focus:outline-none focus:ring-2 focus:ring-fuchsia-600 transition"
            placeholder="Search..."
          />
          <ButtonGroup
            value={type}
            options={[
              { label: 'Movie', value: 'movie' },
              { label: 'TV', value: 'tv' },
              { label: 'Person', value: 'person' },
            ]}
            onClick={(value) => setSearchParams({ type: value })}
          />
        </div>
      </nav>
      <div className="h-1 bg-cyan-600" />
    </header>
  );
};
