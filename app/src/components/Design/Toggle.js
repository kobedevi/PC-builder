import React from "react";
import PropTypes from "prop-types";

const Toggle = React.forwardRef(
  (
    { label, name, onChange, possibleValues, value, error, disabled, ...rest },
    ref

  ) => {
    return (
      <div className="form-group">
        <div className="form-check checkbox-xl" style={{display:"flex", alignItems:"center"}}>
          <input onClick={onChange} style={{padding:"10px"}} className="form-check-input" type="checkbox" value={1} name={name} id={name} disabled={disabled} checked={value}/>
          <label style={{paddingLeft: "10px"}}className="form-check-label" htmlFor={name} >{name}:</label>
        </div>

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
