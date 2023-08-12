import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "../../../../core/routing";
import DetailCard from "../../../Design/DetailCard";
import Layout from "components/Design/Models/Layout";
import Model from "./Model/Model";
import EditIcon from "components/Design/EditIcon";

const GpuDetail = ({ gpu }) => {
  return (
    <div className="fullSize">
      <div className="detail">
        <DetailCard data={gpu} />
        {
          gpu.idGpuPartner && (
            <Link className="edit" to={route(PossibleRoutes.GpuPartnerEdit, { id: gpu.idGpuPartner })}>
              <EditIcon/>
            </Link>
          )
        }
        {
          !gpu.idGpuPartner && (
            <Link className="edit" to={route(PossibleRoutes.GpuEdit, { id: gpu.idGpu })}>
              <EditIcon/>
            </Link>
          )
        }
      </div>

      {
        gpu?.idGpuPartner && (
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
