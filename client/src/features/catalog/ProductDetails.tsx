import { ShoppingBagRounded, ShoppingCartCheckoutRounded } from "@mui/icons-material";
import { Button, createTheme, Divider, Grid, Rating, Table, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {Product} from "../../app/models/product";

export default function ProductDetails() {
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      axios.get(`http://localhost:5000/api/products/${id}`)
     .then(response => setProduct(response.data))
     .catch(error => console.log(error))
     .finally(() => setLoading(false)); 
    }, [id])
    
    if(loading) return <h3>Loading your product...</h3>
    if(!product) return <h3>Product Not Found ! ....</h3>
    

    return(
        <Grid container spacing={6} sx={{mt: 8}}>
           <Grid item xs={6} >
             <img src={product.pictureUrl} alt={product.name} 
             style={{width: '100%', backgroundColor: '#d3d3d3'}} /> 
           </Grid>    

           <Grid item xs={6}>
             <Typography variant='h4'>{product.name}</Typography>
             <Divider sx={{mt: 1, mb: 2}}/>
           
             <Typography variant='h5' color="error">₹{(product.price/100).toFixed(2)}</Typography>
             
             <Divider sx={{mt: 1, mb: 2}}/>
            

             <TableContainer>
               <Table>
                 <TableRow>
                   <TableCell>Name</TableCell>
                   <TableCell>{product.name}</TableCell>
                 </TableRow>

                 <TableRow>
                   <TableCell>Description</TableCell>
                   <TableCell>{product.description}</TableCell>
                 </TableRow>

                 <TableRow>
                   <TableCell>Brand</TableCell>
                   <TableCell>{product.brand}</TableCell>
                 </TableRow>

                 <TableRow>
                   <TableCell>User Ratings</TableCell>
                   <TableCell>{product.rating}</TableCell>
                   <TableCell><Rating name="half-rating" size="medium" defaultValue={4.5} precision={0.5}/></TableCell>
                 </TableRow>

                 <TableRow>
                   <TableCell>Quantity In Stock</TableCell>
                   <TableCell>{product.quantityInStock}</TableCell>
                 </TableRow>

                 <TableRow>
                   <TableCell>Type</TableCell>
                   <TableCell>{product.typeofProduct}</TableCell>
                 </TableRow>

               </Table>
             </TableContainer>
   
   <Grid container spacing={1} xs={12} sx={{mt: 1}}>
     <Grid item xs={6}>
       <Button variant="contained"
        size="medium"
        color="secondary" 
        sx={{width: '100%'}}
        startIcon={<ShoppingBagRounded sx={{color: '#fff'}}/>}>Buy Now</Button>
     </Grid>

     <Grid item xs={6}>
     <Button variant="contained"
        size="medium"
        color="warning" 
        sx={{width: '100%'}}
        startIcon={<ShoppingCartCheckoutRounded sx={{color: '#fff'}}/>}>Add to Cart</Button>
     </Grid>
   </Grid>
          
           </Grid>
        </Grid>
    )
}