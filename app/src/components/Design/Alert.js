import PropTypes from "prop-types";

const Alert = ({ children, color = "primary" }) => {
  if(Array.isArray(children) && children.length === 0) {
    return
  }
  if(Array.isArray(children)) {
    return (
      <div className={`alert alert-${color}`} role="alert">
        <ul>
          {children.map((x, index) => {
            return (
              <li key={index}>{x.toString() || "Something went wrong"}</li>
            );
          })}
        </ul>
      </div>
    )
  }
  return (
    <div className={`alert alert-${color}`} role="alert">
      {children}
    </div>
  );
};

Alert.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "danger", "info"]),
};

export default Alert;
