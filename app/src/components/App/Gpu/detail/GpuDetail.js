import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "../../../../core/routing";
import DetailCard from "../../../Design/DetailCard";
import Layout from "components/Design/Models/Layout";
import Model from "./Model/Model";

const GpuDetail = ({ gpu }) => {
  return (
    <div className="fullSize">
      <div className="detail">
        <DetailCard data={gpu} />
        <Link to={route(PossibleRoutes.GpuEdit, { id: gpu.idGpu })}>
          {gpu.modelName}
        </Link>
      </div>
      {
        gpu.idPartnerGpu && (
          <div className="model">
            <Layout>
              <Model gpu={gpu} />
            </Layout>
          </div>
        )
      }
      
    </div>
  );
};

export default GpuDetail;
