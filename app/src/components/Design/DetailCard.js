import humps from "humps";

const DetailCard = ({ data }) => {

  return (
    <>
      <table className="mt-4">
        <tbody>
          {Object.entries(data).map(([key, value]) => {
            // hide show id fields
            if (!key.includes("id") && !key.includes("image")) {
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
              <td><img className="productImage" src={data.image} alt="Product"/></td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default DetailCard;
