import React from "react";
import PropTypes from "prop-types";

const Toggle = React.forwardRef(
  (
    { label, name, onChange, possibleValues, value, error, disabled, ...rest },
    ref
  ) => {
    return (
      <div className="form-group">
        <label>Has {name}:</label>
        {possibleValues.map((v) => (
          <div className="toggle">
            <input
              type="radio"
              id={v.toString()}
              name={name}
              value={v}
              onChange={onChange}
              defaultChecked={v ? false : true}
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

Toggle.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Toggle;
