import { AddShoppingCart } from "@mui/icons-material";
import { AppBar, FormControlLabel, IconButton, Switch, Toolbar, Typography } from "@mui/material";


interface Props{
    darkMode: boolean;
    HandleThemeChange: ()=> void;
}

export default function Header({ darkMode, HandleThemeChange}: Props){
    return(
        <AppBar position='fixed' sx={{mb: 9}}>
            <Toolbar>
                <Typography variant='h6'>My-Store</Typography>
                <FormControlLabel control={<Switch checked={darkMode} onChange={HandleThemeChange} color="warning"  sx={{ml: 2}} />} label="Dark Mode" />
                <IconButton aria-label ="add_to_shopping_cart">
                <AddShoppingCart sx={{color: "white"}} />
            </IconButton>
            </Toolbar>
           
        </AppBar>
    )
}


