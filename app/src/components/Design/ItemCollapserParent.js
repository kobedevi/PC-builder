import { useState } from "react";
import { ObjectKeysToText } from "components/util/ObjectKeysToText";
import ItemCollapser from "./ItemCollapser";

const ItemCollapserParent = ({title, items}) => {
    const [collapse, setCollapse] = useState(false)

	const handleClick=(e) => {
		e.preventDefault();
		setCollapse(!collapse);
	}

  return (
	<>	
		<h3 onClick={(e) => handleClick(e)}><strong>{ObjectKeysToText(title)}</strong><span className={collapse ? 'rotator' :""}>&#9654;</span></h3>
		{
			(Array.isArray(items) && items.length > 0) &&
			items.map((val, index) => {
			return (
				<div className="previewBox" key={index}>
					<ItemCollapser 
						item={val}
						collapse={collapse}
					/>
				</div>
			)
			})
		}
		{
			(!Array.isArray(items) && Object.keys(items).length > 0) && (
			<div className="previewBox">
				<ItemCollapser 
					item={items}
					collapse={collapse}
				/>
			</div>
			)
		}
	</>
  )
}

export default ItemCollapserParent