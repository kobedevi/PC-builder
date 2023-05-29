import humps from "humps";
import { useState } from "react";
import ProductView from "./ProductView";

const DetailCard = ({ data }) => {

  const [productView, setProductView] = useState();

  return (
    <>
      <table className="mt-4">
        <tbody>
          {Object.entries(data).map(([key, value]) => {
            // hide show id fields
            if (!key.startsWith("id") && !key.startsWith("image") && !key.startsWith("deleted")) {
              return (
                <tr key={key}>
                  <td>
                    {key.charAt(0).toUpperCase() +
                      humps.decamelize(key, { separator: " " }).substring(1)}
                    :
                  </td>
                  <td>{value !== null ? (!Array.isArray(value) ? value : value.join(', ')) : "unknown"}</td>
                </tr>
              );
            }
          })}
          {data.image && (
            <tr key="image">
              <td>Product image:</td>
              <td onClick={() => setProductView(true)}><img className="productImage" src={data.image} alt="Product"/></td>
            </tr>
          )}
        </tbody>
      </table>

      {
        productView && (
          <ProductView
            image={data.image}
            center={true}
            onDismiss={() => setProductView(null)}
          />
        )
      }

    </>

  );
};

export default DetailCard;
