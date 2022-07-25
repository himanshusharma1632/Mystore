import { Pagination, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment } from "react";
import { MetaData } from "../models/pagination";

interface Props {
    metaData : MetaData;
    onPageChange : (page : number) => void;
}

export default function PaginationPage({metaData, onPageChange} : Props) {
const {currentPage, pageSize, totalCount, totalPages} = metaData;
    return (
        <Fragment>
        <Box display ='flex' justifyContent='space-between' alignItems = 'center' sx={{p: 2}}>
        <Typography variant='body2' color='primary'>
        Displaying {(currentPage-1)*pageSize+1} - {currentPage*pageSize > totalCount ? totalCount : currentPage*pageSize} of {totalCount} items</Typography>
        <Pagination count={totalPages} color="secondary"
         page={currentPage}
          size='large'
          onChange={(e, page) => onPageChange(page)} />
    </Box>
    </Fragment>
    )
}