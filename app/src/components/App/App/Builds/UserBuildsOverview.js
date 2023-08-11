import { fetchBuildsByUser } from "core/modules/Builds/api";
import BuildsOverview from "./BuildsOverview";
import { useParams } from "react-router-dom";
import { useState } from "react";

const UserBuildsOverview = () => {
  const { id } = useParams();
  const [userName, setUserName] = useState('Unknown')
    
  return (
    <BuildsOverview
        fetcher={fetchBuildsByUser}
        id={id}
        title={`${userName}'s builds`}
        setUserName={setUserName}
    />
  )

}

export default UserBuildsOverview;