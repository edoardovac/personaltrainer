import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <>
      <h1>Page not found</h1>
      <p>{error.data}</p>
      <a href="/">Home</a>
    </>
  );
}

export default Error;
