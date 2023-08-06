import { useState } from "react";
import { Link } from "react-router-dom";
import { PossibleRoutes } from "../../../core/routing";
import Alert from "../../Design/Alert";
import OriginalGpuOverview from "./Overview/OriginalGpu";
import PartnerGpuOverview from "./Overview/PartnerGpu";
import SearchForm from "components/Design/SearchForm";
import useAdmin from "core/hooks/useAdmin";

const GpuOverview = () => {
  const [info, setInfo] = useState();
  const [query, setQuery] = useState('');
  const isAdmin = useAdmin();

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  return (
    <>
      <h2>GPU Overview</h2>
      {info && <Alert color="info">{info}</Alert>}

      {isAdmin && (
        <Link to={PossibleRoutes.Create} className="btn btn-primary">
          Add GPU
        </Link>
      )}

      <div>
        {isAdmin && (
          <SearchForm
            onSubmit={onSubmit}
            setQuery={setQuery}
          />
        )}
        <OriginalGpuOverview query={query} setQuery={setQuery}/>
        <PartnerGpuOverview query={query} setQuery={setQuery}/>
      </div>
    </>
  );
};

export default GpuOverview;
