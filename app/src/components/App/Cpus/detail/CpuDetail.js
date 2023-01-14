import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "../../../../core/routing";
import CpuDetailCard from "../../../Design/DetailCards/CpuDetailCard";
import Layout from "components/Design/Models/Layout";
import Model from "./Model/Model";

const CpuDetail = ({ cpu }) => {
  return (
    <div className="fullSize">
      <div className="detail">
        <CpuDetailCard cpu={cpu} />
        <Link to={route(PossibleRoutes.CpuEdit, { id: cpu.idProcessor })}>
          {cpu.modelName}
        </Link>
      </div>
      <div className="model">
        <Layout>
          <Model cpu={cpu} />
        </Layout>
      </div>
    </div>
  );
};

export default CpuDetail;
