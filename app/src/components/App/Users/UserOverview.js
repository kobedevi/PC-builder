import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../core/hooks/useFetch";
import { fetchCases } from "../../../core/modules/Case/api";
import { PossibleRoutes } from "../../../core/routing";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "components/shared/ErrorAlert";
import SearchForm from "components/Design/SearchForm";
import ProductCard from "components/Design/ProductCard";
import Pagination from "components/Design/Pagination";
import DeleteButton from "components/Design/DeleteButton";
import EditButton from "components/Design/EditButton";
import { fetchUsers } from "core/modules/Users/api";
import DeleteUser from "./Delete/DeleteUser";

const UserOverview = () => {
  const [info, setInfo] = useState();
  const [deleteUser, setDeleteUser] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(20)
  
  const handlePerPageClick = (perPage) => {
    setPerPage(perPage)
  }

  const handlePageClick = (page) => {
    setPage(page)
  }

  const apiCall = useCallback(() => {
    return fetchUsers(page, perPage);
  }, [page, perPage]);

  const { data, error, setError, isLoading, refresh } = useFetch(apiCall);

  console.log(data);
  
  const onUpdate = () => {
    setDeleteUser(null);
    setQuery(null);
    refresh();
  };

  const onSubmit = (query) => {
    setQuery(query.search)
  }

  return (
    <>
      <h2>Users Overview</h2>

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
        data && (
          <>

            {
              info && <Alert color="info">{info}</Alert>
            }

            <SearchForm
              onSubmit={onSubmit}
              setQuery={setQuery}
            />

            <Link to={PossibleRoutes.Create} className="btn btn-primary">
              Add User
            </Link>

            {/* {
              query && <Result updateChecker={deleteCase} deleter={setDeleteCase} result={query}/>
            } */}

            {
                !query && (
                    <>
                        <table className='mt-4'>
                            <thead>
                                <tr>    
                                    <th></th>
                                    <th>Email</th>
                                    <th>Username</th>
                                    <th>role</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { data.map((user) => (
                                    <tr key={user._id}>
                                        <td>
                                            <DeleteButton deleter={() => setDeleteUser(user)}/>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <EditButton editor={() => setCurrentUser(user)}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )
            }

            {
              deleteUser && (
                <DeleteUser
                  user={deleteUser}
                  onUpdate={onUpdate}
                  onDismiss={() => setDeleteUser(null)}
                  setError={setError}
                  setInfo={setInfo}
                />
              )
            }

          </>
        )
      }
    </>
  );
};












export default UserOverview;
