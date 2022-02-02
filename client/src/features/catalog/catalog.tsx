import { Agent } from "http";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import Loading from "../../app/layout/Loading";
import {Product} from "../../app/models/product";
import ProductList from "./ProductList";


export default function Catalog(){

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setloading] = useState(true);
  
    useEffect(()=>
    {
     agent.Catalog.list().then(products => setProducts(products))
     .catch(error => console.log(error))
     .finally(() => setloading(false))
    }, [])

    if(loading) return <Loading />
    

    return(
        <>
       <ProductList products={products}/>
    
     </>
    )
}