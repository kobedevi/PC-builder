import { useState } from "react";
import { ObjectKeysToText } from "components/util/ObjectKeysToText";

const ItemCollapser = ({item}) => {
    const [collapse, setCollapse] = useState(false)

	const handleClick=(e) => {
		e.preventDefault();
		setCollapse(!collapse);
	}

  return (
	<>
		<p style={{color: "black", marginBottom: 0}}><strong>{item.modelName}</strong> <a href="#" onClick={(e) => handleClick(e)}>{!collapse ? "More..." : "Less..."}</a></p>
		
		<ul className={collapse ? "list-unstyled collapser show" : "hide"}>
			{Object.entries(item).map(([key, item]) => {
				if (!key.startsWith("id") && !key.startsWith("image") && !key.startsWith("deleted") && !key.startsWith("modelName")) {
					if(item !== null && typeof item[0] === 'object'){	
						return (
							<li key={key}>
								<strong>{ObjectKeysToText(key)}:</strong> 
								<ul>
									{item.map(x => {
										return (
										<li style={{marginTop:'.25rem'}}>
											<ul style={{listStyle: 'none', padding: 0}}>
											{Object.entries(x).map(([key, s]) => {
												if(!key.startsWith("id")) {
													return (
														<li>
															<strong>{ObjectKeysToText(key)}:</strong> {s}
														</li>
													)
												}
												return;
											})}

											</ul>
										</li>)
									})}
								</ul>
							</li>
						)
					}
					return (
						<li key={key}>
							<strong>{ObjectKeysToText(key)}:</strong> {item && item !== null ? item :'unknown'}
						</li>
					)
				}
			})}
		</ul>
	</>
  )
}

export default ItemCollapser