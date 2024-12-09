import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <main>
      <div className="container min-h-screen flex flex-col justify-center items-center gap-5">
        <h1 className="text-9xl font-bold">404</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <Link
          className="border  px-4 py-2 rounded-lg hover:border-black duration-200"
          to="/"
        >
          Go back to the homepage
        </Link>
      </div>
    </main>
  );
};

export default ErrorPage;
