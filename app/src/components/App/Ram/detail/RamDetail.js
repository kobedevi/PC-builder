import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "../../../../core/routing";
import DetailCard from "components/Design/DetailCard";
import Layout from "../../../Design/Models/Layout";
import Model from "./Model/Model";
import EditIcon from "components/Design/EditIcon";

const RamDetail = ({ ram }) => {
  return (
    <div className="fullSize">
      <div className="detail">
        <DetailCard data={ram} />
        <Link className="edit"
          to={route(PossibleRoutes.RamEdit, { id: ram.idRam })}
        >
          <EditIcon/>
        </Link>
      </div>
      <div className="model">
        <Layout>
          <Model ram={ram}/>
        </Layout>
      </div>
    </div>
  );
};

export default RamDetail;
