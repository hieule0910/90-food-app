import shopApi from '../api/shopApi';
import { setShopProducts } from '../features/Shop/shopSlice';
import { createContext } from 'react';
import { useDispatch } from 'react-redux';

import queryString from 'query-string';

import { useHistory } from 'react-router-dom';

const apiContext = createContext();

const ApiProvider = ({ children }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const getProducts = async (type, params) => {
        try {
            const res = await shopApi.getAll(type, { ...params });
            const action = setShopProducts(res.data);
            dispatch(action);
            // routes
            history.push({
                pathname: type,
                search: queryString.stringify({ ...params }),
            });
        } catch (err) {
            console.log(err.message);
        }
    };
    return <apiContext.Provider value={{ getProducts }}> {children} </apiContext.Provider>;
};

export { apiContext };
export default ApiProvider;
