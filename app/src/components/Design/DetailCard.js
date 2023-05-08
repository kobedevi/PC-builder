import humps from "humps";

const DetailCard = ({ data }) => {

  return (
    <table className="mt-4">
      <tbody>
        {Object.entries(data).map(([key, value]) => {
          // hide show id fields
          if (!key.includes("id")) {
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
      </tbody>
    </table>
  );
};

export default DetailCard;
