import { useState } from "react";
import humps from "humps";

const ItemCollapser = ({item}) => {
    const [collapse, setCollapse] = useState(false)

	const handleClick=(e) => {
		e.preventDefault();
		setCollapse(!collapse);
	}

  return (
	<>
		<p style={{color: "black", marginBottom: 0}}><strong>{item.modelName}</strong><a href="#" onClick={(e) => handleClick(e)}>{!collapse ? "More..." : "Less..."}</a></p>
		
		<ul className={collapse ? "list-unstyled collapser show" : "hide"}>
			{Object.entries(item).map(([key, item]) => {
				if (!key.startsWith("id") && !key.startsWith("image") && !key.startsWith("deleted") && !key.startsWith("modelName")) {
				return (
				<li key={key}>
					<strong>{key.charAt(0).toUpperCase() + humps.decamelize(key, { separator: " " }).substring(1)}
					:</strong> {item}
				</li>)
				}
			})}
		</ul>
	</>
  )
}

export default ItemCollapser