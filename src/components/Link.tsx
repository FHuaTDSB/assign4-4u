import type { ReactNode } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

type LinkProps = {
  children: ReactNode;
  to: string;
  match?: string[];
};

export const Link = ({ children, to, match = [] }: LinkProps) => {
  const { pathname } = useLocation();
  const matched = match.some((pattern) => matchPath({ path: pattern, end: false }, pathname));

  return (
    <NavLink
      replace
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 rounded-md transition-all duration-200 flex items-center ${
          isActive || matched
            ? 'bg-cyan-600 text-white shadow-lg scale-105'
            : 'bg-fuchsia-800 text-fuchsia-200 hover:bg-fuchsia-600 hover:text-white'
        }`
      }
    >
      {children}
    </NavLink>
  );
};