import PropTypes from "prop-types";
import ItemCollapserParent from "./ItemCollapserParent";
import { useState } from "react";

const ItemList = ({ info, color = "primary" }) => {

  const [collapse, setCollapse] = useState(false);

  return (
    <>
      <button style={{zIndex: 9, position:"fixed", right:0, color: "black"}} onClick={() => setCollapse(!collapse)}>&gt;</button>
      <div className={collapse ? 'hide ItemList' : 'show ItemList'}>
        <div style={{marginTop:"6rem", height:"100%", overflowY:"auto"}}>
          {Object.entries(info).map(([key, value], i) => {
            if (!key.startsWith("id")){
              return (
                <div className="item" key={key}>
                  <ItemCollapserParent title={key} items={value}/>
                </div>
              )
            }
            return;
          })}
        </div>
      </div>
    </>
  );
};

ItemList.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "danger", "info"]),
};

export default ItemList;
