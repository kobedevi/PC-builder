import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "../../../../core/routing";
import DetailCard from "../../../Design/DetailCard";
import Layout from "components/Design/Models/Layout";
import Model from "./Model/Model";

const PsuDetail = ({ psu }) => {
  return (
    <div className="fullSize">
      <div className="detail">
        <DetailCard data={psu} />
        <Link to={route(PossibleRoutes.PsuEdit, { id: psu.idPsu })}>
          {psu.modelName}
        </Link>
      </div>
      <div className="model">
        <Layout>
          <Model psu={psu} />
        </Layout>
      </div>
    </div>
  );
};

export default PsuDetail;
