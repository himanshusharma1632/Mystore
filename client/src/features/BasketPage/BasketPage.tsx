import { Add, DeleteOutlined, Remove } from "@mui/icons-material";
import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/REDUX/configureStore";
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from "./BasketSlice";
import BasketSummary from "./BasketSummary";

export default function BasketPage(){
const [loading, setloading] = useState(false);

/*const { basket, setBasket, removeItem } = useStoreContext();*/
const dispatch= useAppDispatch();
const { basket } = useAppSelector(state=> state.basket);

if (loading) return <Loading message='आपकी टोकरी लोड हो रही है ...' />;
if(!basket) return <Typography variant="h4" sx={{mt: 10}}>Your Basket Is Empty</Typography>;


    return(
      <Fragment>
        <Grid container spacing ={3} sx={{mt: 8}}>
            <Grid item xs={12} lg={8} xl={8}>
            <TableContainer><Paper elevation={3}>
<Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Product Type</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {basket.items.map(items=>(
            <TableRow
              key={items.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component ="th" scope = "row">
                  <img src={items.pictureUrl} alt={items.name} style={{maxWidth: 60, backgroundColor: '#ADD8E6', padding: 2}} />
              </TableCell>
              <TableCell component="th" scope="row" sx={{fontWeight: 500}} color="text.success">
                  {items.name}
              </TableCell>
              <TableCell align="right">{items.brand}</TableCell>
              <TableCell align="right">{items.type}</TableCell>
              <TableCell align="center">
                <IconButton 
                color="error"
                onClick ={()=> dispatch(removeBasketItemAsync({productId: items.productId, quantity : 1}))}>
                  <Remove />
                </IconButton>
                {items.quantity}
                <IconButton 
                onClick={()=> dispatch(addBasketItemAsync({productId : items.productId, quantity : 1}))}
                color="success"
                >
                  <Add />
                </IconButton>
              </TableCell>
              <TableCell align="right">₹{(items.price/100).toFixed(2)}</TableCell>
              <TableCell align="right">
                <IconButton color="success" onClick={()=> dispatch(removeBasketItemAsync({productId: items.productId, quantity: items.quantity}))}>
                  <DeleteOutlined color="success" />
                  </IconButton>
                  </TableCell>
            </TableRow>
             ))}
        </TableBody>
      </Table>
      </Paper>
    </TableContainer>
         
            </Grid>
  
<Grid item xs={12} lg={4} md={4}>
  <BasketSummary />
</Grid>
        </Grid>

        
        </Fragment>
    )
}