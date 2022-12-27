import Alert from "../Design/Alert";

const ErrorAlert = ({ error }) => {
  if (!error) {
    return null;
  }

  if (error.response.data.errors) {
    return (
      <Alert color="danger">
        <ul>
          {error.response.data.errors.map((x) => {
            return <li>{x.msg.toString() || "Something went wrong"}</li>;
          })}
        </ul>
      </Alert>
    );
  }

  return (
    <Alert color="danger"> {error.message || "Something went wrong"} </Alert>
  );
};

export default ErrorAlert;
