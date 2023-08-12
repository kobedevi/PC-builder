import moment from "moment";
import ItemCollapserParent from "./ItemCollapserParent";
import PriceCalc from "./PriceCalc";

const ItemListDetail = ({info}) => {

  return (
    <div className='collapserParent itemListDetail'>
      <div className="ItemList">
        <div style={{marginTop:"1rem", height:"calc(100% - 1rem)", overflowY:"auto"}}>
          <div style={{padding: "0 1rem"}}>
            {info.name ? <h1 style={{fontFamily: "Geologica", textAlign:"left", fontSize:"1.5rem"}}>{info.name}</h1> : ''} 
            {info.user.userName ? <h2 style={{fontFamily: "Geologica", textAlign:"left", fontSize:"1rem"}}>By: {info.user.userName}</h2> : ''} 
            {/* date * 1000 to convert unix timecode to js date */}
            <h6><strong>Date published: </strong><br/>{moment(new Date(info.date.undefined * 1000)).format("D MMM YYYY")}</h6> 
          </div>
          {Object.entries(info).map(([key, value], i) => {
            if (!key.startsWith("id") && !key.startsWith("date") && !key.startsWith("user") && !key.startsWith("totalPrice") && !key.startsWith("name")){
              return (
                <div className="item" key={key}>
                  <ItemCollapserParent title={key} items={value}/>
                </div>
              )
            }
            return;
          })}
          <PriceCalc info={info}/>
        </div>
      </div>
    </div>
  );
};

export default ItemListDetail;
