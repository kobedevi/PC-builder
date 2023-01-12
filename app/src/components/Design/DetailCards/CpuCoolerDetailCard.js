import React from "react";

const CpuCoolerDetailCard = ({ cooler }) => {
  return (
    <table className="mt-4">
      <tbody>
        <tr>
          <td>{cooler.manufacturerName}</td>
        </tr>
        <tr>
          <td>{cooler.modelName}</td>
        </tr>
        <tr>
          <td>Height</td>
          <td>{cooler.height}</td>
        </tr>
        <tr>
          <td>Width</td>
          <td>{cooler.width}</td>
        </tr>
        <tr>
          <td>Depth</td>
          <td>{cooler.depth}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CpuCoolerDetailCard;
