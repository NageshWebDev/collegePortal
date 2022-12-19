import { useRouteError } from "react-router-dom";
import style from './ErrorPage.module.css'

export default function ErrorPage() {
  const error = useRouteError();
  console.log('error page')
  console.error(error);

  return (
    <main className={style.errorPage_main}>
      <div className={style.errorPage_div}>
        <h1> <i className="fa-solid fa-triangle-exclamation"></i> Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </main>
  );
}