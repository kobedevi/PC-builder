import { ObjectKeysToText } from "components/util/ObjectKeysToText";
const { v4: uuidv4 } = require("uuid");

const ItemCollapser = ({item, collapse}) => {

  return (
	<>	
		{item?.image && (
			<div>
				<img className={collapse ? "show" : "hide"} src={item.image} alt="Product"/>
			</div>
		)}
		<p className={collapse ? "show" : "hide"} style={{color: "black", marginTop: ".5rem", marginBottom: 0}}><strong>{item.modelName}</strong></p>
		<ul className={collapse ? "list-unstyled collapser show" : "hide"}>
			{Object.entries(item).map(([key, item]) => {
				if (!key.startsWith("id") && !key.startsWith("image") && !key.startsWith("deleted") && !key.startsWith("modelName") && !key.startsWith("localId")) {
					if(item !== null && typeof item[0] === 'object'){
						return (
							<li style={{marginTop:'.25rem'}} key={key}>
								<strong>{ObjectKeysToText(key)}:</strong> 
								<ul>
									{item.map((x) => {
										return (
										<li style={{marginTop:'.25rem'}} key={uuidv4()}>
											<ul style={{listStyle: 'none', padding: 0}}>
												{Object.entries(x).map(([key, s]) => {
													if(!key.startsWith("id")) {
														return (
															<li key={x.idStorageType + s}>
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