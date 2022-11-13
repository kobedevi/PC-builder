import PropTypes from 'prop-types';

const Alert = ({ children, color = "primary" }) => {
    return (
        <div className={`alert alert-${color}`} role="alert">
            { children }
        </div>
    )
};

Alert.propTypes = {
    color: PropTypes.oneOf(['primary', 'secondary', 'danger', 'info']),
};

export default Alert;
