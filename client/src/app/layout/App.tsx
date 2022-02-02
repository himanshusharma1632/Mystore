import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
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





 function App() {

  const [darkMode , setDarkMode]= useState(false);
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
     <Route component ={NotFound} />
     </Switch>
     </Container>
     </ThemeProvider>
  );
}
export default App;

