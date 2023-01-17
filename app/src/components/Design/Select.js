import React from "react";
import PropTypes from "prop-types";

const Select = React.forwardRef(
  ({ label, name, options = [], onChange, value, error, disabled }, ref) => {
    return (
      <div className="form-group">
        {label && <label htmlFor={name}>{label}:</label>}
        <select
          className={`form-control ${error ? "is-invalid" : ""}`}
          name={name}
          ref={ref}
          disabled={disabled}
          value={value || ""}
          onChange={onChange}
        >
          <option>--</option>
          {options &&
            options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
        </select>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
);

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Select;
