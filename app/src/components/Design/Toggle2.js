import React from "react";
import PropTypes from "prop-types";

const Toggle = React.forwardRef(
  (
    { label, name, onChange, possibleValues, value, error, disabled, ...rest },
    ref
  ) => {
    return (
      <div className="form-group">
        <label>{label}:</label>
        {possibleValues.map((v, index) => (
          <div>
            <input
              type="radio"
              id={v.toString()}
              name={name}
              value={v}
              onChange={onChange}
              defaultChecked={index === 0 ? true : false}
              {...rest}
            />
            <label htmlFor={v.toString()}>{v.toString()}</label>
            <br />
          </div>
        ))}

        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
);

Toggle.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Toggle;
