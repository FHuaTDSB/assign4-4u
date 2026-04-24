import { MainLayout } from '@/layouts/MainLayout';
import {
  CareerView,
  CreditsView,
  EpisodeView,
  ErrorView,
  GenreView,
  HomeView,
  ImagesView,
  MoviesView,
  MovieView,
  PersonView,
  ReviewsView,
  SearchView,
  SeasonsView,
  TelevisionView,
  TrailersView,
  TrendingView,
} from '@/views';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeView />} />
        <Route path="/movies/category/:category" Component={() => <MoviesView key={window.location.pathname} />} />
        <Route path="/movie/:id" element={<MovieView />}>
            <Route path="credits" element={<CreditsView />} />
            <Route path="trailers" element={<TrailersView />} />
            <Route path="reviews" element={<ReviewsView />} />
          </Route>
        <Route path="/tv">
          <Route path="category/:category" Component={() => <TelevisionView key={window.location.pathname} />} />
          <Route path=":id" element={<MovieView />}>
            <Route path="seasons" element={<SeasonsView />} />
            <Route path="season/:season" element={<EpisodeView />} />
            <Route path="credits" element={<CreditsView />} />
            <Route path="trailers" element={<TrailersView />} />
            <Route path="reviews" element={<ReviewsView />} />
          </Route>
        </Route>
        <Route path="/trending/:media" Component={() => <TrendingView key={window.location.pathname} />} />
        <Route path="/genre/:media/:genre" element={<GenreView />} />
        <Route path="/search" element={<SearchView />} />
        <Route path="/person/id:" element={<PersonView />}>
          <Route path="career" element={<CareerView />} />
          <Route path="images" element={<ImagesView />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};

export default App;
