import { Card, CardContent, Typography, CardActions, Button, makeStyles, Container, TextField, Grid, IconButton, InputAdornment, Input, InputLabel, FormControl, Link, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, CircularProgress } from '@material-ui/core'
import { NextSeo } from 'next-seo';
import Image from 'next/image'
import React, { useEffect } from 'react'
import theme from '../../utils/theme';
import { RiEyeCloseLine, RiEyeLine, RiLock2Line, RiMailLine } from "react-icons/ri";
import Logo from "../../assets/images/hrlogo.png";
import DialogMigrate from '../../components/Dialog';
import { blue, red } from '@material-ui/core/colors';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router'
import { Slide, toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { HTTPSubmitLogin } from '../../api/auth';
import { HTTPGetProfil } from '../../api/user';
import Cookies from "js-cookie";
import { initialStateUserAuthByAsync, setAuthStatus, setReduxUsersProfile } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/rootReducer';
import Lottie from "lottie-react";
import LoadingScreen from '../../assets/lottie_file/loading-book.json';
import { setLoading } from '../../store/loading';

const useStyles = makeStyles({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
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
  toast.configure()
  const classes = useStyles();
  
  const loading = useSelector((state: RootState) => state.loading);
  const userRedux = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch()
  
  const router = useRouter()
  const msg = router.query.msg;


  /* -------------------------------------------------------------------------- */
  /*                                    state                                   */
  /* -------------------------------------------------------------------------- */
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const tokenCookies = Cookies.get('token')

  /* -------------------------------------------------------------------------- */
  /*                                  hooks                                 */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    // console.log(userRedux)
    if (tokenCookies === '' || tokenCookies === undefined) {
      dispatch(setLoading({show: false}))
    } else {
      if (userRedux.token !== '') {
        router.push('/')
        // dispatch(setLoading({show: false}))
        // initialStateUserAuthByAsync(dispatch)
      } else {
        initialStateUserAuthByAsync(dispatch)
      }
    }
  }, [dispatch, userRedux.token])
  
  React.useEffect(() => {
    if (msg === 'please_login') {
      toast('Silahkan login terlebih dahulu', {
        position: "bottom-right",
        autoClose: 5000,
        type: 'error',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        transition: Slide
      })
    } else if (msg === 'token_expired') {
      toast('Silahkan login kembali', {
        position: "bottom-right",
        autoClose: 5000,
        type: 'error',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        transition: Slide
      })
    }
  }, [msg])

  /* -------------------------------------------------------------------------- */
  /*                                 handle form                                */
  /* -------------------------------------------------------------------------- */
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      // console.log(JSON.stringify(values, null, 2));
      httpLoginUser(values)
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("format email tidak sesuai")
        .required("email wajib diisi"),
      password: Yup.string()
        .required("password wajib diisi"),
    })
  });

  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const httpLoginUser = async (params: {email: string, password: string}) => {
    setLoadingSubmit(true)

    try {
      const response = await HTTPSubmitLogin({
        email: params.email,
        password: params.password,
      })
      // console.log('login = ',response)
      
      if (response.status === 201) {
        try {
          const responseProfil = await HTTPGetProfil({token: response.data.access_token})
          dispatch(setAuthStatus({
            token: response.data.access_token
          }))
          dispatch(setReduxUsersProfile({
            fullname: responseProfil.data.data.fullname,
            address: responseProfil.data.data.address,
            phone: responseProfil.data.data.phone,
            email: responseProfil.data.data.email,
            role_name: responseProfil.data.data.role.role_name,
            slug_role_name: responseProfil.data.data.role.slug_role_name,
            foto: responseProfil.data.data.foto,
            gender: responseProfil.data.data.gender,
          }))
          
          if (responseProfil.status === 200) {
            setLoadingSubmit(false)
            toast(response.data.message, {
              position: "bottom-right",
              autoClose: 5000,
              type: 'success',
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              transition: Slide
            })
            
            router.push('/')
          }
        } catch (error: any) {
          const errors = JSON.parse(JSON.stringify(error))
          toast(errors.message, {
            position: "bottom-right",
            autoClose: 5000,
            type: 'error',
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            transition: Slide
          })
          setLoadingSubmit(false)
        }
      }
    } catch (error: any) {
      const errors = JSON.parse(JSON.stringify(error))
      if (errors.statusCode === 401) {
        toast('email / password salah', {
          position: "bottom-right",
          autoClose: 5000,
          type: 'error',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          transition: Slide
        })
      }
      setLoadingSubmit(false)
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  if (loading.show === true) {
    return(
      <div className="flex items-center justify-center flex-col h-screen">
        <Lottie animationData={LoadingScreen} style={{ width: 200 }} />
      </div>
    )
  } else {
    return (
      <div className="h-screen flex justify-center items-center bg-login">
        <NextSeo
          title="Login"
          titleTemplate = '%s - HRKU Client'
          description="Hrku Login Description"
        />
        <Container maxWidth="xs">
          <Card className="card_login">
            <CardContent className="my-5">
              <form 
                onSubmit={formik.handleSubmit}
                autoComplete="on"
                className="flex flex-col justify-center items-center"
              >
                <div className="mb-4">
                  <Image src={Logo} width="70" height="70" className="pointer-events-none"/>
                </div>
                <div className="mb-4">
                  <FormControl error={formik.errors.email ? true : false}>
                    <InputLabel htmlFor="standard-adornment-email">
                      Email
                    </InputLabel>
                    <Input 
                      placeholder="Masukan email"
                      className="w-56"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      startAdornment={
                        <InputAdornment position="start">
                          <RiMailLine color="#000" size="20"/>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText>{formik.errors.email ? formik.errors.email : ''}</FormHelperText>
                  </FormControl>
                </div>

                <div className="mb-2">
                  <FormControl error={formik.errors.password ? true : false}>
                    <InputLabel htmlFor="standard-adornment-password">
                      Password
                    </InputLabel>
                    <Input 
                      name="password"
                      placeholder="Masukan password"
                      className="w-56"
                      type={values.showPassword ? 'text' : 'password'}
                      onChange={formik.handleChange}
                      value={formik.values.password}
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
                    <FormHelperText>{formik.errors.password ? formik.errors.password : ''}</FormHelperText>
                  </FormControl>
                </div>

                <div className={`${classes.wrapper} mt-4`}>
                  <Button 
                    size="medium" 
                    variant="contained" 
                    color="primary"
                    className="w-56"
                    disabled={loadingSubmit}
                    type="submit"
                  >Masuk</Button>
                  {loadingSubmit && <CircularProgress size={24} className={classes.buttonProgress} />}
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
                  onChange={formik.handleChange}
                  value={formik.values.email}
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
}

export default Login
