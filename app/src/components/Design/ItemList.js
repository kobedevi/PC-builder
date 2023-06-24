import PropTypes from "prop-types";
import humps from "humps";

const ItemList = ({ info, color = "primary" }) => {
  return (
    <div className={`alert alert-${color}`} role="alert">
      {Object.entries(info).map(([key, value]) => {
        return (
          <div key={key}>
            <h3><strong>{key}</strong></h3>
            <ul className="list-unstyled" >
              {Object.entries(value).map(([key, item], index) => {
                if (!key.startsWith("id") && !key.startsWith("image") && !key.startsWith("deleted")) {
                  return (
                  <li key={key}>
                    <strong>{key.charAt(0).toUpperCase() + humps.decamelize(key, { separator: " " }).substring(1)}
                    :</strong> {item}
                  </li>)
                }
              })}
              </ul>
          </div>
        )
      })}
    </div>
  );
};

ItemList.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "danger", "info"]),
};

export default ItemList;
