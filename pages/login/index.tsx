import { Card, CardContent, Typography, CardActions, Button, makeStyles, Container, TextField, Grid, IconButton, InputAdornment, Input, InputLabel, FormControl, Link, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { NextSeo } from 'next-seo';
import Image from 'next/image'
import React from 'react'
import theme from '../../utils/theme';
import { RiEyeCloseFill, RiEyeFill, RiLock2Line, RiMailLine } from "react-icons/ri";
import Logo from "../../assets/images/hrlogo.png";

const useStyles = makeStyles({
});

const Login = () => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <NextSeo
        title="Login"
        titleTemplate = '%s - HRKU Client'
        description="Hrku Login Description"
      />
      <Container maxWidth="xs">
        <Card>
          <CardContent className="my-5">
            <form noValidate autoComplete="off"
              className="flex flex-col justify-center items-center"
            >
              <div className="mb-4">
                <Image src={Logo} width="70" height="70" className="pointer-events-none"/>
              </div>
              <div className="mb-4">
                <FormControl>
                  <InputLabel htmlFor="standard-adornment-email">
                    Email
                  </InputLabel>
                  <Input 
                    placeholder="Masukan email"
                    className="w-56"
                    onChange={handleChange('email')}
                    value={values.email}
                    startAdornment={
                      <InputAdornment position="start">
                        <RiMailLine color="#000" size="20"/>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className="mb-2">
                <FormControl>
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input 
                    placeholder="Masukan password"
                    className="w-56"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    startAdornment={
                      <InputAdornment position="start">
                        <RiLock2Line color="#000" size="20"/>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {values.showPassword ? <RiEyeFill color="#000" size="20" /> : <RiEyeCloseFill color="#000" size="20" />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>

              <div className="mt-4">
                <Button 
                  size="medium" 
                  variant="contained" 
                  color="primary"
                  className="w-56"
                >Masuk</Button>
              </div>
              
              <Button 
                variant="text" 
                color="primary" 
                onClick={handleClickOpen}
              >
                Lupa Password ?
              </Button>

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary" >
                    Disagree
                  </Button>
                  <Button onClick={handleClose} color="primary" autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

export default Login
