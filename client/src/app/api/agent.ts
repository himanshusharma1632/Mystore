import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { URLSearchParams } from "url";
import { history } from "../..";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../REDUX/configureStore";

const sleep =()=> new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL='http://localhost:5000/api/';
axios.defaults.withCredentials =true;

const responseBody = (response: AxiosResponse) => response.data;

const requests ={
    get: (url: string, params ? : URLSearchParams)=> axios.get(url, {params}).then(responseBody),
    post: (url : string, body: {})=>axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url : string)=>axios.delete(url).then(responseBody),
}

const Catalog = {
list: (params : URLSearchParams)=> requests.get('products', params),
details : (id: number)=> requests.get(`products/${id}`),
fetchFilters : () => requests.get('products/filters'),
}

const TestError = {
    GetBadRequest: ()=> requests.get("/Buggy/bad-request"),
    GetServerError: ()=> requests.get("/Buggy/server-error"),
    GetNotFound: ()=> requests.get("/Buggy/not-found"),
    GetValidationError: () => requests.get("/Buggy/validation-error"),
}

//basket Fetcher
const BasketFetcher ={
    getBasket: ()=> requests.get('basket'),
    AddBasketItem: (productId: number, quantity = 1)=> requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    RemoveBasketItem: (productId: number, quantity = 1)=> requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

const Account = {
    login : (values : any) => requests.post('Account/login', values),
    register : (values : any) => requests.post('Account/register', values),
    currentUser : () => requests.get('Account/currentUser'),
}

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if(token) config.headers.Authorization = `Bearer ${token}`;
        return config;
});

axios.interceptors.response.use(async response =>{
    await sleep();
    const pagination = response.headers['pagination']; //axios always accept the lower case header namings
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        console.log(response);
        return response; 
    }
    return response;
}, (error: AxiosError)=>{
     
    const {data, status} = error.response!;
    switch(status){

        case 400:
        if(data.errors){
            const modelStateErrors : string[] =[];
            for(const key in data.errors)
            {
                if(data.errors[key])
                {
                    modelStateErrors.push(data.errors[key])
                }
            } 
            throw modelStateErrors.flat();
        }    
        toast.warn(data.title, {
            theme: "dark",
        });
        break;
        
        case 401: toast.error(data.detail, {
            theme: "dark",
        });
        break;

        case 500:
            history.push({
                pathname : '/server-error',
                state : {error: data},  
            });
        break;

        case 404: toast.error(data.title, {
            theme: "dark",
        });
        break;

        default: 
        break;

    }
    return Promise.reject(error.response);
})

const agent = {
    Catalog, TestError, BasketFetcher, Account
}

export default agent;