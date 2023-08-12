import PropTypes from "prop-types";
import ItemCollapserParent from "./ItemCollapserParent";
import { useState } from "react";
import PriceCalc from "./PriceCalc";

const ItemList = ({ info, setTotalPrice }) => {

  const [collapse, setCollapse] = useState(false);

  return (
    <div className={collapse ? 'hideWidth collapserParent' : 'showWidth collapserParent'}>
      <button onClick={() => setCollapse(!collapse)}><span className={collapse ? 'rotator test' : 'test'}>&#9654;</span></button>
      <div className="ItemList">
        <div style={{marginTop:"6rem", overflowY:"auto"}}>
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
          <PriceCalc setTotalPrice={setTotalPrice} info={info}/>
        </div>
      </div>
    </div>
  );
};

ItemList.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "danger", "info"]),
};

export default ItemList;
