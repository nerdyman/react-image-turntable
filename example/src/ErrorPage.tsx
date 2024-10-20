/* eslint-disable no-console */
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as Error & { statusText?: string };
  console.error('[ErrorPage]', error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>

      <a href="/">Go back to the demo</a>
    </div>
  );
}
