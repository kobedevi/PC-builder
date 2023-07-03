import PropTypes from "prop-types";
import humps from "humps";
import ItemCollapser from "../Design/ItemCollapser";

const ItemList = ({ info, color = "primary" }) => {

  return (
    <div className="ItemList">
      {Object.entries(info).map(([key, value], i) => {
        return (
          <div className="item" key={key}>
            <h3><strong>{key.charAt(0).toUpperCase() + humps.decamelize(key, { separator: " " }).substring(1)}</strong></h3>
              {
                (Array.isArray(value) && value.length > 0) &&
                value.map(val => {
                  return (
                    <div className="previewBox">
                      {val.image && <img style={{width: "200px", height: "auto", maxHeight: "300px", objectFit:"cover"}} src={val.image} alt="Product"/>}
                      <ItemCollapser item={val}/>
                    </div>
                  )
                })
              }
              {
                (!Array.isArray(value) && Object.keys(value).length > 0) && (
                  <div className="previewBox">
                    {value.image && <img style={{width: "200px", height: "auto", maxHeight: "300px", objectFit:"cover"}} src={value.image} alt="Product"/>}
                    <ItemCollapser item={value}/>
                  </div>
                )
              }
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
