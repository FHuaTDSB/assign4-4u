import { FaGithub } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="align-self-end">
      <div className="h-1 bg-cyan-900" />
      <nav className="flex p-4 bg-blue-950 justify-between py-5 px-30">
        <p className="text-cyan-500">Built with React, Vite, Tailwind and React Router</p>
        <div className="flex gap-8">
          <a href="https://github.com/FHuaTDSB/assign4-4u" className="text-cyan-500 flex gap-2 items-center" target="blank">
            <FaGithub className="text-cyan-500" />
            Github
          </a>
        </div>
      </nav>
    </footer>
  );
};
