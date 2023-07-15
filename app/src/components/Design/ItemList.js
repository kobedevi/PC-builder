import PropTypes from "prop-types";
import ItemCollapser from "../Design/ItemCollapser";
import { ObjectKeysToText } from "components/util/ObjectKeysToText";

const ItemList = ({ info, color = "primary" }) => {

  return (
    <div className="ItemList">
      {Object.entries(info).map(([key, value], i) => {
        return (
          <div className="item" key={key}>
            <h3><strong>{ObjectKeysToText(key)}</strong></h3>
              {
                (Array.isArray(value) && value.length > 0) &&
                value.map((val, index) => {
                  return (
                    <div className="previewBox" key={index}>
                      {val.image && <img style={{width: "100%", height: "auto", maxHeight: "300px", objectFit:"cover"}} src={val.image} alt="Product"/>}
                      <ItemCollapser item={val}/>
                    </div>
                  )
                })
              }
              {
                (!Array.isArray(value) && Object.keys(value).length > 0) && (
                  <div className="previewBox">
                    {value.image && <img style={{width: "100%", height: "auto", maxHeight: "300px", objectFit:"cover"}} src={value.image} alt="Product"/>}
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
