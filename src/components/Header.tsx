export const Header = () => {
  return (
    <header>
      <nav className="flex gap-4 p-4 bg-purple-950">
        <div className="flex gap-2">
          <img src="/src/assets/logo.png" alt="FlickerPix Logo" className="h-8" />
          <h1 className="text-2xl font-bold border-l-3 border-cyan-300 pl-2">Flickerpix</h1>
        </div>
      </nav>
      <div className="h-1 bg-cyan-300"></div>
    </header>
  );
};
