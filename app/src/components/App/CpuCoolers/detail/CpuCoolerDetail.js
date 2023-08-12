import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "../../../../core/routing";
import DetailCard from "components/Design/DetailCard";
import Layout from "../../../Design/Models/Layout";
import Model from "./Model/Model";
import EditIcon from "components/Design/EditIcon";

const CpuCoolerDetail = ({ cooler }) => {
  return (
    <div className="fullSize">
      <div className="detail">
        <DetailCard data={cooler} />
        <Link className="edit"
          to={route(PossibleRoutes.CpuCoolerEdit, { id: cooler.idCpuCooler })}
        >
          <EditIcon/>
        </Link>
      </div>
      <div className="model">
        <Layout>
          <Model cooler={cooler} />
        </Layout>
      </div>
    </div>
  );
};

export default CpuCoolerDetail;
