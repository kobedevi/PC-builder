import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "../../../../core/routing";
import DetailCard from "../../../Design/DetailCard";
import Layout from "components/Design/Models/Layout";
import Model from "./Model/Model";
import EditIcon from "components/Design/EditIcon";

const CpuDetail = ({ cpu }) => {
  return (
    <div className="fullSize">
      <div className="detail">
        <DetailCard data={cpu} />
        <Link className="edit" to={route(PossibleRoutes.CpuEdit, { id: cpu.idProcessor })}>
          <EditIcon/>
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
