import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import Header from "./Header";
import { useCallback, useEffect, useState } from "react";
import AboutPage from "../../features/about/AboutPage";
import { Route } from "react-router-dom";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/Contact/ContactPage";
import CollectionPage from "../../features/Collections/CollectionPage";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../error/ServerError";
import NotFound from "../error/NotFound";
import { Switch } from "react-router-dom";
import BasketPage from "../../features/BasketPage/BasketPage";
import agent from "../api/agent";
import { getCookie } from "../util/Cookies";
import Loading from "./Loading";
import { fetchBasketAsync, setBasket } from "../../features/BasketPage/BasketSlice";
import { useAppDispatch, useAppSelector } from "../REDUX/configureStore";
import Login from "../../features/account/Login/Login";
import Register from "../../features/account/Register/Register";
import { fetchUserAsync } from "../../features/account/accountSlice";




 function App() {
 
const [initializing, setinitializing] = useState(true);
/*const { setBasket } = useStoreContext();*/
const dispatch = useAppDispatch();
const [darkMode , setDarkMode]= useState(false);

const InitializeApplication = useCallback(async () => {
  try{
await dispatch(fetchUserAsync());
await dispatch(fetchBasketAsync());
  }catch(error : any){
    console.log(error);
  }}, [dispatch]);

useEffect(()=>{
InitializeApplication().then(() => setinitializing(false));
}, [InitializeApplication])

if (initializing) return <Loading message="Staging App ..." />




  const paletteType= darkMode ? 'dark' : 'light';
  const theme= createTheme({
    palette : {
     mode : paletteType, 
     background: {
       default: paletteType=== 'light' ? '#eaeaea' : '#121212'
     }
    },
  })

  function HandleThemeChange(){
    setDarkMode(!darkMode);
  }
  

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position ='bottom-right' hideProgressBar />
    <CssBaseline/>
     <Header darkMode={darkMode} HandleThemeChange={HandleThemeChange} />
     <Container>
     <Switch>
     <Route exact path='/' component={HomePage} />
     <Route exact path='/catalog' component= {Catalog} />
     <Route exact path='/catalog/:id' component={ProductDetails} />
     <Route exact path='/about' component={AboutPage} />
     <Route exact path='/Contact' component={ContactPage} />
     <Route exact path='/Collections' component={CollectionPage} />
     <Route exact path ='/server-error' component={ServerError} />
     <Route exact path ='/BasketPage' component={BasketPage} />
     <Route exact path ='/account/Login' component={Login} />
     <Route exact path ='/account/Register' component={Register} />
     <Route component ={NotFound} />
     </Switch>
     </Container>
     </ThemeProvider>
  );
}
export default App;

