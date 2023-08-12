import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "../../../../core/routing";
import DetailCard from "../../../Design/DetailCard";
import Layout from "components/Design/Models/Layout";
import Model from "./Model/Model";
import EditIcon from "components/Design/EditIcon";

const MotherboardDetail = ({ motherboard }) => {
  return (
    <div className="fullSize">
      <div className="detail">
        {/* TODO: cpusockets mapping */}
        <DetailCard data={motherboard} />
        <Link className="edit"
          to={route(PossibleRoutes.MotherboardEdit, {
            id: motherboard.idMotherboard,
          })}
        >
          <EditIcon/>
        </Link>
      </div>
      <div className="model">
        <Layout>
          <Model motherboard={motherboard} />
        </Layout>
      </div>
    </div>
  );
};

export default MotherboardDetail;
