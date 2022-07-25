import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import PaginationPage from "../../app/components/PaginationPage";
import SortPage from "../../app/components/SortPage";
import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/REDUX/configureStore";
import { fetchFilters, productSelector, productsFetchAsync, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import SearchPage from "./SearchPage";

const sortList = [
    { value: 'name', label: 'Alphabatical' },
    { value: 'priceDesc', label: 'High To Low' },
    { value: 'price', label: 'Low To High' }
]

export default function Catalog() {


    const products = useAppSelector(productSelector.selectAll);
    const { loadedProducts, status, filtersLoaded, brandList, typeList, productParams, metaData } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (!loadedProducts) dispatch(productsFetchAsync());
    }, [loadedProducts, dispatch]);

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [filtersLoaded, dispatch]);

    if (status.includes('pending') || !metaData) return <Loading />


    return (
        <>
            <Grid container spacing={4} sx={{ mt: 8 }}>
                <Grid item xs={3}>
                    <Paper sx={{ mt: 0, p: 2 }}>
                      <SearchPage />
                    </Paper>

                    <Paper sx={{ mt: 2, p: 2 }}>
                       <SortPage 
                        selectedValue={productParams.orderBy}
                        options={sortList}
                        onChange={(event) => dispatch(setProductParams({orderBy : event?.target.value}))}  />
                    </Paper>

                    <Paper sx={{ mt: 2, p: 2 }}>
                     <CheckboxButtons items={brandList} 
                     checked={productParams.brandList}
                     onChange={(items : string[]) => dispatch(setProductParams({brandList: items}))} />
                    </Paper>

                    <Paper sx={{ mt: 2, p: 2 }}>
                    <CheckboxButtons items={typeList} 
                     checked={productParams.typeList}
                     onChange={(items : string[]) => dispatch(setProductParams({typeList: items}))} />
                    </Paper>
                </Grid>

                <Grid item xs={9}>
                    <ProductList products={products} />
                </Grid>

                <Grid item xs={3} />
              <Grid item xs ={9}>
              <PaginationPage
               onPageChange ={(page : number) => dispatch(setProductParams({pageNumber : page}))}
               metaData = {metaData}
              />
         </Grid>
      </Grid>
        </>
    )
}