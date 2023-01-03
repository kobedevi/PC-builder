import PropTypes from "prop-types";

const Button = ({
  children,
  onClick,
  color = "success",
  type = "button",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      className={`btn btn-${color} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "reset", "submit"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "warning",
    "light",
    "outline-light",
    "danger",
  ]),
};

export default Button;
