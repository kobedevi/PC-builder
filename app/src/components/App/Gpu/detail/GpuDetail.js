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
        {
          gpu.idGpuPartner && (
            <Link to={route(PossibleRoutes.GpuPartnerEdit, { id: gpu.idGpuPartner })}>
              Partner: {gpu.modelName}
            </Link>
          )
        }
        {
          !gpu.idGpuPartner && (
            <Link to={route(PossibleRoutes.GpuEdit, { id: gpu.idGpu })}>
              Original: {gpu.modelName}
            </Link>
          )
        }
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
