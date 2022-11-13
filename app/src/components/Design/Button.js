import PropTypes from 'prop-types';

const Button = ({ children, onClick, color = "primary", type = "button", className='' }) => {
    return (
        <button
            className={`btn btn-${color} ${className}`}
            onClick={onClick}
            type={type}
            >
            { children }
        </button>
    )
};

Button.propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    color: PropTypes.oneOf(['primary', 'secondary', 'light', 'outline-light', 'danger']),
};

export default Button;
