import React from "react";

const CpuDetailCard = ({ cpu }) => {
  return (
    <table className="mt-4">
      <tbody>
        <tr>
          <td>{cpu.manufacturerName}</td>
        </tr>
        <tr>
          <td>{cpu.modelName}</td>
        </tr>
        <tr>
          <td>{cpu.clockSpeed}</td>
        </tr>
        <tr>
          <td>{cpu.cores}</td>
        </tr>
        <tr>
          <td>{cpu.wattage ? cpu.wattage : "unknown"} W</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CpuDetailCard;
