import { Card, CardContent, Typography, CardActions, Button, makeStyles, Container, TextField, Grid, IconButton, InputAdornment, Input, InputLabel, FormControl, Link, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { NextSeo } from 'next-seo';
import Image from 'next/image'
import React from 'react'
import theme from '../../utils/theme';
import { RiEyeCloseLine, RiEyeLine, RiLock2Line, RiMailLine } from "react-icons/ri";
import Logo from "../../assets/images/hrlogo.png";
import DialogMigrate from '../../components/dialog';
import { red } from '@material-ui/core/colors';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

const useStyles = makeStyles({
});

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const data: any = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }
  
  console.log(data.name)
  return { props: {ninjas: data }}
}

const Login = ({ninjas}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
    <div className="h-screen flex justify-center items-center bg-login">
      <NextSeo
        title="Login"
        titleTemplate = '%s - HRKU Client'
        description="Hrku Login Description"
      />
      <Container maxWidth="xs">
        <Card className="card_login">
          {ninjas.name}
          <CardContent className="my-5">
            <form 
              autoComplete="off"
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
                          {values.showPassword ? <RiEyeLine color="#000" size="20" /> : <RiEyeCloseLine color="#000" size="20" />}
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
                  type="submit"
                >Masuk</Button>
              </div>
              
              <div className="mt-2 cursor-pointer"
                onClick={handleClickOpen}
              >
                Lupa Password ?
              </div>

            </form>
          </CardContent>
        </Card>
      </Container>
      
      <DialogMigrate
        open={open}
        disableEscapeKeyDown
        disableBackdropClick
        onClose={handleClose}
      >
        <div className="m-5">
          <div className="text-lg">Lupa Password</div>
          <div className="mb-8 mt-6">
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
          <div className="flex justify-end">
            <div className="mr-2">
              <Button size="small" onClick={handleClose} color="secondary" variant="outlined">
                Batal
              </Button>
            </div>
            <div>
              <Button size="small" onClick={handleClose} color="primary" variant="contained" autoFocus>
                Kirim
              </Button>
            </div>
          </div>
        </div>
      </DialogMigrate>
    </div>
  )
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
//   const data = await res.json()

//   console.log('data = ',res.json())

//   // Pass data to the page via props
//   return { props: { data } }
// }

export default Login
