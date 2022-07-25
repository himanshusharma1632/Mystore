import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, FormControlLabel, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../REDUX/configureStore";


interface Props{
    darkMode: boolean;
    HandleThemeChange: ()=> void;
}

const MidLinks=[
    {title: 'Catalog', path: '/catalog'}, 
    {title: 'About', path: '/about'}, 
    {title: 'Contact', path: '/contact'},
    {title: 'Collections', path: '/collections'},
]

const RightLinks=[
    {title : 'Login', path: '/login'},
    {title : 'Register', path: '/register'}, 
]

const NavStyles={
    color: 'inherit', 
    typography: 'h6',
    '&:hover' :{
             color: 'warning.main'
             },
   '&.active' : {
             color: 'grey.500'
         },
         textDecoration: 'none'  

                
}



export default function Header({ darkMode, HandleThemeChange}: Props){

const { basket } = useAppSelector(state => state.basket);
const CountBasket = basket?.items.reduce((sum, items)=> sum + items.quantity, 0);

    return(
        <AppBar position='fixed' sx={{mb: 9}}>
            <Toolbar 
            sx={{display: 'flex',
                 justifyContent: 'space-between',
                 alignItems: 'center',     
                      }}>

             <Box display='flex'
             alignItems='center'>
                <Typography variant='h6'
                   component={NavLink}
                   to='/'
                   exact 
                   sx={NavStyles}  
                >
                    My-Store
                </Typography>
                <FormControlLabel control={<Switch checked={darkMode} onChange={HandleThemeChange} color="warning"  sx={{ml: 2}} />} label="Dark Mode" />
            </Box>

            

                <List sx={{display: 'flex'}}>
                  {MidLinks.map(({title, path})=>(
                  <ListItem
                   component={NavLink}
                   key={path}
                   to={path}
                   sx={NavStyles}
                   >
                   {title.toUpperCase()}
                </ListItem>
                  ))}
                  </List>

          <Box display='flex'
               alignItems='center'
                >
                
                <List sx={{display: 'flex'}}>
                {RightLinks.map(({title, path})=>(
                 <ListItem
                  component={NavLink}
                  key={path}
                  to={path}
                  sx={NavStyles}
                 >
                 {title.toUpperCase()}
                 </ListItem>
               ))}
            </List>

            <IconButton size='large' 
            sx={{color: 'inherit'}}
            component={Link}
            to='/BasketPage'
            >
                    <Badge badgeContent={CountBasket} color='warning'>
                        <ShoppingCart />
                    </Badge>
                    </IconButton>

          </Box>


            </Toolbar>
           
        </AppBar>
    )
}


