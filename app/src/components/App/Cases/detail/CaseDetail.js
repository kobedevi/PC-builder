import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "../../../../core/routing";
import DetailCard from "../../../Design/DetailCard";
import Layout from "components/Design/Models/Layout";
import Model from "./Model/Model";
import EditIcon from "components/Design/EditIcon";

const CaseDetail = ({pccase}) => {
  return (
    <div className="fullSize">
      <div className="detail">
        <DetailCard data={pccase} />
        <Link className="edit"
          to={route(PossibleRoutes.CaseEdit, {
            id: pccase.idCase,
          })}
        >
          <EditIcon/>
        </Link>
      </div>
      <div className="model">
        <Layout>
          <Model pccase={pccase} />
        </Layout>
      </div>
    </div>
  );
};

export default CaseDetail;
