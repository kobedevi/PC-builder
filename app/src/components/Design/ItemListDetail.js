import moment from "moment";
import ItemCollapserParent from "./ItemCollapserParent";

const ItemListDetail = ({info}) => {

  return (
    <div className='collapserParent itemListDetail'>
      <div className="ItemList">
        <div style={{marginTop:"1rem", height:"calc(100% - 1rem)", overflowY:"auto"}}>
          <div style={{padding: "0 1rem"}}>
            {info.user.userName ? <h2>By: {info.user.userName}</h2> : ''} 
            {/* date * 1000 to convert unix timecode to js date */}
            <h6><strong>Date published: </strong><br/>{moment(new Date(info.date.undefined * 1000)).format("D MMM YYYY")}</h6> 
          </div>
          {Object.entries(info).map(([key, value], i) => {
            if (!key.startsWith("id") && !key.startsWith("date") && !key.startsWith("user")){
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
    </div>
  );
};

export default ItemListDetail;
