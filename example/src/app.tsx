import type { FC } from 'react';
import { createBrowserRouter, Link, type LinkProps, RouterProvider, useLocation } from 'react-router-dom';

import { AdvancedDemo } from './demos/advanced';
import { BasicDemo } from './demos/basic';
import ErrorPage from './error-page';

const links: LinkProps[] = [
  { children: 'Advanced', to: '/' },
  { children: 'Basic', to: '/basic' },
];

const Nav: FC = () => {
  const location = useLocation();

  if (new URLSearchParams(location.search).get('noNav') === 'true') {
    return false;
  }

  return (
    <nav className="nav">
      <ul className="nav-list">
        {links.map((link) => (
          <li className="nav-list__item" key={link.to as string}>
            <Link
              {...link}
              className="nav-list__link"
              aria-current={location.pathname === link.to ? true : undefined}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Nav />
        <AdvancedDemo />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/basic',
    element: (
      <>
        <Nav />
        <div className="main__turntable">
          <BasicDemo />
        </div>
      </>
    ),
    errorElement: <ErrorPage />,
  },
]);

export const App = () => {
  return (
    <div className="main">
      <h1 className="sr-only">React Image Turntable</h1>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
