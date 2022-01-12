import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import Catalog from "../../features/catalog/catalog";
import Header from "./Header";
import { useState } from "react";





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
    <CssBaseline/>
     <Header darkMode={darkMode} HandleThemeChange={HandleThemeChange} />
     <Container>
     <Catalog />
     </Container>
     </ThemeProvider>
  );
}
export default App;

