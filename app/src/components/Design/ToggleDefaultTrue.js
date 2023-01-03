import React from "react";
import PropTypes from "prop-types";

const ToggleDefaultTrue = React.forwardRef(
  (
    { label, name, onChange, possibleValues, value, error, disabled, ...rest },
    ref
  ) => {
    return (
      <div className="form-group">
        <label>{label}:</label>
        {possibleValues.map((v, index) => (
          <div className="toggle">
            <input
              type="radio"
              id={v.toString()}
              name={name}
              value={v}
              onChange={onChange}
              defaultChecked={index === 0 ? false : true}
              {...rest}
            />
            <label htmlFor={v.toString()}>{v.toString()}</label>
          </div>
        ))}

        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
);

ToggleDefaultTrue.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default ToggleDefaultTrue;
