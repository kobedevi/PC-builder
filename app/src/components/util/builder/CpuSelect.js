import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchCpus, fetchFilteredCpus } from "../../../core/modules/CPU/api";
import { PossibleRoutes, route } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "../../shared/ErrorAlert";
import ProductCard from "components/Design/ProductCard";
import SearchForm from "components/Design/SearchForm";
import Result from "./Result";

const CpuSelect = ({updateFields}) => {
  const [info, setInfo] = useState();
  const [query, setQuery] = useState('');

  const {
    data: cpus,
    error,
    setError,
    isLoading,
    refresh,
  } = useFetch(fetchCpus);

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  return (
    <>

      {
        error && (
          <ErrorAlert error={error} />
        )
      }

      {
        isLoading && (
          <Spinner />
        )
      }

      {
        cpus && (
          <>

            {
              info && <Alert color="info">{info}</Alert>
            }

            <SearchForm
              isPublic={true}
              onSubmit={onSubmit}
              setQuery={setQuery}
            />

            {
              query && <Result filter={fetchFilteredCpus} result={query}/>
            }

            {
              !query && (
                <ul className="movieList">
                  {cpus.map((cpu) => (
                    <li key={cpu.idProcessor}>
                      <ProductCard
                        product={cpu}
                        link={PossibleRoutes.Detail}
                        id={cpu.idProcessor}
                      >
                        Manufacturer: {cpu.manufacturerName}<br/>
                        Base Clock: {cpu.clockSpeed}Ghz<br/>
                        Cores: {cpu.cores}<br/>
                        Socket: {cpu.socketType}
                      </ProductCard>
                      <button type="button" onClick={e => updateFields({idCpu: cpu.idProcessor})}>Choose</button>
                    </li>
                  ))}
                </ul>
              )
            }
          </>
        )
      }
    </>
  );
};

export default CpuSelect;
