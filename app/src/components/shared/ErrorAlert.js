import Alert from "../Design/Alert";

const ErrorAlert = ({ error, children }) => {
  console.log("we should start here");
  console.log(error);
  console.log(children);
  if (!error) {
    return null;
  }

  if (error.response.data.errors) {
    console.log("we should be here");
    return (
      <Alert color="danger">
        <ul>
          {error.response.data.errors.map((x, index) => {
            return (
              <li key={index}>{x.msg.toString() || "Something went wrong"}</li>
            );
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
