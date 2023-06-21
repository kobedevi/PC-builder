import { Link } from "react-router-dom";
import { PossibleRoutes, route } from "../../../../core/routing";
import DetailCard from "../../../Design/DetailCard";
import Layout from "components/Design/Models/Layout";
import Model from "./Model/Model";

const StorageDetail = ({ storage }) => {
  return (
    <div className="fullSize">
      <div className="detail">
        <DetailCard data={storage} />
        <Link
          to={route(PossibleRoutes.StorageEdit, {
            id: storage.idStorage,
          })}
        >
          {storage.modelName}
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
