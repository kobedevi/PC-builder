import { useEffect, useCallback, useReducer } from 'react';
import useNoAuthApi from './useNoAuthApi';
// import useAuthApi from './useAuthApi';

const initialState = {
    data: null,
    error: null,
    page: 1,
};

const Actions = {
    Prev: 'prevPage',
    Next: 'nextPage',
    Data: 'setData',
    Error: 'setError',
    Clear: 'clear',
};

const reducer = (state, action) => {
    switch (action.type) {
        case Actions.Prev:
            return {
                ...state,
                page: Math.max(state.page - 1, 1),
                data: null,
            };
        case Actions.Next:
            return {
                ...state,
                page: state.page + 1,
                data: null,
            };
        case Actions.Clear:
            return {
                ...state,
                data: null,
                error: null,
            };
        case Actions.Data:
            return {
                ...state,
                data: action.payload,
            };
        case Actions.Error:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

const useFetch = (apiCall) => {

    const withNoAuth = useNoAuthApi();

    const [state, dispatch] = useReducer(reducer, initialState);

    const { data, error } = state;

    const nextPage = useCallback(() => dispatch({ type: Actions.Next }), []);
    const prevPage = useCallback(() => dispatch({ type: Actions.Prev }), []);
    const setData = useCallback(
        (data) => dispatch({ type: Actions.Data, payload: data }),
        []
    );
    const setError = useCallback(
        (error) => dispatch({ type: Actions.Error, payload: error }),
        []
    );

    const fetchData = useCallback(
        () => {
            let isCurrent = true;

            withNoAuth(apiCall())
                .then((data) => isCurrent && setData(data))
                .catch((error) => isCurrent && setError(error));

            return () => {
                isCurrent = false;
            }
        },
        [setData, setError, apiCall]
    );

    const refresh = () => {
        fetchData();
    };

    useEffect(() => {
        dispatch({ type: Actions.Clear });
        if (apiCall) {
            const cleanUp = fetchData();
            return cleanUp;
        }
    }, [apiCall, fetchData]);

    const isLoading = !data && !error;

    return {
        data,
        setData,
        error,
        setError,
        nextPage,
        prevPage,
        refresh,
        isLoading,
    };
};

export default useFetch;