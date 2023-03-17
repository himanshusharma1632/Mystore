import { Product } from "../../app/models/product";
import { Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { useAppDispatch, useAppSelector } from "../../app/REDUX/configureStore";
import SkeletonProductCard from "../../app/components/SkeletonProductCard";
import InfiniteScroll from "react-infinite-scroller";
import { productsFetchAsync, setProductParams } from "./catalogSlice";
import { useState } from "react";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    const [loadingNext, setLoadingNext] = useState<boolean>(false);
    const { loadedProducts, productParams, metaData } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    // load more function
    function handleGetNext() {
        setLoadingNext(true);
        dispatch(setProductParams({ pageNumber: metaData!.currentPage + 1 }));
        dispatch(productsFetchAsync()).then(() => setLoadingNext(false));
    };

    return (
        <>
            <InfiniteScroll
                pageStart={0}
                loadMore={handleGetNext}
                hasMore={!loadingNext && !!metaData && metaData.currentPage < metaData.totalPages}
                initialLoad={false}
            >
                <Grid container spacing={4}>
                    {products.map(product => (
                        <Grid item xs={4} key={product.id}>
                            {!loadedProducts ? (
                                <SkeletonProductCard />
                            ) :
                                (
                                    <ProductCard product={product} />
                                )
                            }
                        </Grid>
                    ))}
                </Grid>

                <Grid container >
                    <Grid item xs={12} >
                        {loadingNext && <Typography>{'Loading ...'}</Typography>}
                    </Grid>
                </Grid>
            </InfiniteScroll>
        </>
    )
}