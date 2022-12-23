import React from "react";
import PropTypes from "prop-types";

const NumberInput = React.forwardRef(
  (
    {
      type = "number",
      label,
      name,
      onChange,
      value,
      error,
      disabled,
      min = 1,
      max,
      placeholder,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="form-group">
        {label && <label htmlFor={name}>{label}:</label>}
        <input
          id={name}
          className={`form-control ${error ? "is-invalid" : ""}`}
          type={type}
          name={name}
          ref={ref}
          disabled={disabled}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          placeholder={placeholder}
          {...rest}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
);

NumberInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default NumberInput;
