import Alert from "../Design/Alert";

const ErrorAlert = ({ error }) => {
  if (!error) {
    return null;
  } else if (error?.response?.data?.errors) {
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
  } else if (error?.response?.data?.message) {
    return (
      <Alert color="danger">
        {error.response.data.message || "Something went wrong"}
      </Alert>
    );
  } else if (error?.message) {
    return (
      <Alert color="danger">{error.message || "Something went wrong"}</Alert>
    );
  }
  else if ((error.builderMsg)) {
    return (
      <Alert color="danger">
        {error.builderMsg.toString() || "Something went wrong"}
      </Alert>
    );
  }
  return <Alert color="danger">{"Something went wrong"}</Alert>;
};

export default ErrorAlert;
