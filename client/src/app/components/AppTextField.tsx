import { InputBaseComponentProps, InputLabelProps, InputProps, TextField } from "@mui/material";
import { Fragment } from "react";
import { useController, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps{
    label : string;
    fullWidth : boolean;
}

export default function AppTextField(props : Props){
const {field, fieldState} = useController({...props, defaultValue : ''});
    return (
        <Fragment>
            <TextField 
            {...props}
            {...field}
            variant='outlined'
            error={!!fieldState.error}
            helperText ={fieldState.error?.message}
            />
        </Fragment>
    )
}