import { useState, useCallback } from "react";
import useFetch from "../../../core/hooks/useFetch";
import Alert from "../../Design/Alert";
import Spinner from "../../Design/Spinner";
import ErrorAlert from "components/shared/ErrorAlert";
import SearchForm from "components/Design/SearchForm";
import Pagination from "components/Design/Pagination";
import DeleteButton from "components/Design/DeleteButton";
import EditButton from "components/Design/EditButton";
import { fetchUsers } from "core/modules/Users/api";
import DeleteUser from "./Delete/DeleteUser";
import CreateOrEditUser from "./forms/CreateOrEditUser";
import { useAuth } from "components/Auth/AuthContainer";
import Result from "./forms/Result";

const UserOverview = () => {
  const [info, setInfo] = useState();
  const [deleteUser, setDeleteUser] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(20)
  
  const auth = useAuth();

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

  const handleCreateUser = () => {
    setCurrentUser({});
  };
  
  const onUpdate = () => {
    setDeleteUser(null);
    setCurrentUser(null);
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

            <button onClick={() => handleCreateUser()} className="btn btn-primary">
              Add User
            </button>

            {
              query && <Result 
                result={query} 
                setCurrentUser={setCurrentUser} 
                onUpdate={onUpdate}
                deleteUser={deleteUser}
                setDeleteUser={setDeleteUser}
                authUser={auth}
              />
            }

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
                                { data.results.map((user) => {
                                  if(user.email !== auth?.user.email) {
                                    return (<tr key={user.idUsers}>
                                        <td>
                                            <DeleteButton deleter={() => setDeleteUser(user)}/>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <EditButton editor={() => setCurrentUser(user)}/>
                                        </td>
                                    </tr>)
                                  }
                                  return;
                                })}
                            </tbody>
                        </table>
                        <Pagination
                          page={page}
                          perPage={perPage}
                          pageAmount={data.pageAmount}
                          perPageClick={handlePerPageClick}
                          onClick={handlePageClick}
                        />
                    </>
                )
            }
            {
              currentUser && (
                <CreateOrEditUser
                  user={currentUser}
                  onUpdate={onUpdate}
                  onDismiss={() => setCurrentUser(null)}
                />
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
