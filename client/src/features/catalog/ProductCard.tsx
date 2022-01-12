import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface Props {
    product: Product;
}

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}


export default function ProductCard({product}: Props){
    return(
        <Card>
        <CardHeader
            avatar={
             <Avatar sx={{bgcolor: 'secondary.main'}}>
               {product.name.charAt(0).toUpperCase()}
             </Avatar>
              
            }
            title={product.name}
            titleTypographyProps={{
              sx:{fontWeight: 'bold', color: 'primary.main'}
            }}
        />

<CardMedia
          sx={{height: '140', backgroundPosition:'center', backgroundSize:'contain', bgcolor: 'secondary.light'}}
          component="img"
          
          image={product.pictureUrl}
          alt="green iguana"
        />

        <CardContent>
          <Typography gutterBottom color="secondary" variant="h5">
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {product.brand} / {product.typeofProduct}
           </Typography>
           <Typography component="div" gutterBottom>
             {product.quantityInStock}
             </Typography>
             <Typography gutterBottom variant='h6' sx={{color: 'secondary.main'}}> 
              ₹{(product.price/100).toFixed(2)}
             </Typography>
        </CardContent>
        <CardActions>
          <Button variant='outlined' color="primary" disableElevation size="small" startIcon={<DeleteForeverTwoToneIcon color="warning" />}>Buy Now</Button>
          <Button variant='outlined' size="small" startIcon={<HomeIcon color="success" />}>Add To Cart</Button>
        </CardActions>
      </Card>
      
    )
}