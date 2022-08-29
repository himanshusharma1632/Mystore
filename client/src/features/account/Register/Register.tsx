import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import agent from '../../../app/api/agent';
import { Paper, Stack } from '@mui/material';
import { Image, Photo } from '@mui/icons-material';
import { useState } from 'react';
import { User } from '../../../app/models/User';
import { json } from 'stream/consumers';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
       MyStore.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
const [formdata, setFromData] = useState<User>({
email : "",
Token : "",
name : "",
profilePhotoURL : "",
profileName : "",
profileFile : null,
});

const handleInputChange = (event : any) => {
const {name, value} = event.target;
setFromData({...formdata!, [name] : value});
}

const ShowPreview = (event : any) => {
if (event.target.files && event.target.files[0]){
let profileImage = event.target.files[0];
const reader = new FileReader();

reader.onload = (x : any) => {
  setFromData({
    ...formdata,
    profileFile : profileImage,
    profilePhotoURL : x.target?.result
  })
}
reader.readAsDataURL(profileImage);
 }else {
  setFromData({
    ...formdata,
    profileFile : null,
    profilePhotoURL : ""
  })
 }
}


//const [uploadImage, setUploadImage] = useState({preview : ''});
const {register, handleSubmit, formState : {isValid, isSubmitting, errors}} = useForm<User>({ mode : 'all' });
const onSubmit = async (data : FieldValues) => {
  await agent.Account.register(data);
}
/*const handleUploadImage = (event : any) => {
if(event.target.files.length){
    let imageURL = event.target.files[0];
    setUploadImage({preview : URL.createObjectURL(imageURL)});
    console.log(imageURL);
}};*/

  return (
      <Container component="main" maxWidth="sm" sx={{justifyContent : 'center' , alignItems : 'center'}}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius : '10px',
            p: 5, mt : 18
          }}
          component ={Paper}
          elevation ={0}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Stack direction ="row" spacing ={1}>
              <Grid item sx={{m: 1}} xs={6}>
                <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="name"
                  required
                  fullWidth
                  id="Name"
                  label="Full Name"
                  autoFocus
                  {...register('name', {
                    onChange : handleInputChange,
                    required : 'Please Enter your Full name here!!'
                  })}
                  error={!!errors.name}
                  helperText ={errors?.name?.message}
                />
                </Grid>
                <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...register('email', {
                    onChange :  handleInputChange,
                    required : 'A valid email address is required !'
                  })}
                  error={!!errors.email}
                  helperText ={errors?.email?.message ? errors?.email?.message : 'We will not share your email with anyone'}
                />
              </Grid>
              <Grid item xs={12}>
               <Button
                variant="contained" 
                component="label" 
                endIcon={<Photo />}
                fullWidth
                {...register('profilePhotoURL', {
                  onChange : handleInputChange,
                  required : 'Please insert a profile image'
                })}
                >
                  {formdata.profilePhotoURL ? "Change Profile" : "Upload Profile Image"}
                 {/*uploadImage.preview ? "Change Image" : "Upload Image"*/}
                <input hidden multiple type="file" 
                 accept= "image/*"
                 onChange={ShowPreview}
                 />
                </Button>
                <Typography variant ='body2'>{errors.profilePhotoURL?.message ? errors.profilePhotoURL?.message : "Select your display image"}</Typography>
              </Grid>
              </Grid>
              </Grid>

              <Grid item xs={6} >
                <Grid container spacing ={0}>
                    <Grid item xs={12} sx={{mt : 0, m : 1, border : '1px solid #000'}}>
                    <Paper elevation ={2} sx={{justifyContent : 'center' , alignItems : 'center', m: 2}}>
                    <img src={formdata?.profilePhotoURL ? formdata.profilePhotoURL : ''} alt ={formdata?.profileName} width ="100%" height = "175px" />
                    
                {/*uploadImage.preview ?
                    (<img src = {uploadImage.preview} alt="profile photo" width ="100%" height = "175px" />) : 
                    (<Image color='disabled' sx ={{width : '100%' , height : 'auto'}} />)
              */}
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              </Stack>
           
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  );
}