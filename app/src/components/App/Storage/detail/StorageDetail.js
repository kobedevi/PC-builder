import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "../../../../core/routing";
import DetailCard from "../../../Design/DetailCard";
import Layout from "components/Design/Models/Layout";
import Model from "./Model/Model";
import EditIcon from "components/Design/EditIcon";

const StorageDetail = ({ storage }) => {
  return (
    <div className="fullSize">
      <div className="detail">
        <DetailCard data={storage} />
        <Link className="edit"
          to={route(PossibleRoutes.StorageEdit, {
            id: storage.idStorage,
          })}
        >
          <EditIcon/>
        </Link>
      </div>
      <div className="model">
        <Layout>
          <Model storage={storage} />
        </Layout>
      </div>
    </div>
  );
};

export default StorageDetail;
