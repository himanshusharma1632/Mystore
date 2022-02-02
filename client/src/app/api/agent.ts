import { Close } from "@mui/icons-material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";

const sleep =()=> new Promise(resolve => setTimeout(resolve, 2000));

axios.defaults.baseURL='http://localhost:5000/api/';

const responseBody = (response: AxiosResponse) => response.data;

const requests ={
    get: (url: string)=> axios.get(url).then(responseBody),
    post: (url : string, body: {})=>axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url : string)=>axios.delete(url).then(responseBody),
}

const Catalog = {
list: ()=> requests.get('products'),
details : (id: number)=> requests.get(`products/${id}`)
}

const TestError = {
    GetBadRequest: ()=> requests.get("/Buggy/bad-request"),
    GetServerError: ()=> requests.get("/Buggy/server-error"),
    GetNotFound: ()=> requests.get("/Buggy/not-found"),
    GetValidationError: () => requests.get("/Buggy/validation-error"),
}

axios.interceptors.response.use(async response =>{
    await sleep();
    console.log(sleep());
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
        
        case 401: toast.error(data.title, {
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
    Catalog, TestError
}

export default agent;