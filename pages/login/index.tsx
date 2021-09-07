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
import { HTTPSubmitLogin } from '../../api/auth';
import { HTTPGetProfil } from '../../api/user';
import Cookies from "js-cookie";
import { initialStateUserAuthByAsync, setAuthStatus, setReduxUsersProfile } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/rootReducer';
import Lottie from "lottie-react";
import LoadingScreen from '../../assets/lottie_file/loading-book.json';
import HrdLottie from '../../assets/lottie_file/hrd.json';
import { setLoading } from '../../store/loading';
import ImageLogin from '../../assets/images/bg_login.webp'
import { useForm } from "react-hook-form";
import { ILoginValidation } from '../../types/formValidation';

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
  const [disableBtnLogin, setDisableBtnLogin] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const tokenCookies = Cookies.get('token')

  /* -------------------------------------------------------------------------- */
  /*                                  hooks                                     */
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
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ILoginValidation>();
  const onSubmits = (data: any) => {
    httpLoginUser(data)
  };

  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const httpLoginUser = async (params: {email: string, password: string}) => {
    setLoadingSubmit(true)
    setDisableBtnLogin(true)

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
            // setLoadingSubmit(false)
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
          setDisableBtnLogin(false)
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
      setDisableBtnLogin(false)
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


  /* -------------------------------------------------------------------------- */
  /*                                 show page                                  */
  /* -------------------------------------------------------------------------- */
  if (loading.show === true) {
    return(
      <div className="flex items-center justify-center flex-col h-screen">
        <Lottie animationData={LoadingScreen} style={{ width: 200 }} />
      </div>
    )
  } else {
    return (
      <div className="h-screen bg-login">
        <NextSeo
          title="HRKU All In One Apps"
          description="Hrku adalah aplikasi AllInOne yang dibuat untuk memudahkan HRD dalam mengelola penggajian, data karyawan, cuti karyawan, dll."
        />
        {/* <div className="image-login">
          <Image src={ImageLogin} className="pointer-events-none"/>
        </div> */}
        <div className="tablet:flex items-center justify-center flex-col h-screen phone:hidden xphone:hidden">
          <Lottie animationData={HrdLottie} style={{ width: 400 }} />
        </div>
        <div className="card-login">
          <Card>
            <CardContent className="my-5">
              <form 
                onSubmit={handleSubmit(onSubmits)}
                autoComplete="on"
                className="flex flex-col justify-center items-center"
              >
                <div className="mb-4">
                  <Image src={Logo} width="70" height="70" className="pointer-events-none"/>
                </div>
                <div className="mb-4">
                  <FormControl error={errors.email ? true : false}>
                    <InputLabel htmlFor="standard-adornment-email">
                      Email
                    </InputLabel>
                    <Input 
                      placeholder="Masukan email"
                      className="w-56"
                      {...register("email", { 
                        required: 'wajib diisi',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "format e-mail tidak sesuai",
                        },
                      })}
                      startAdornment={
                        <InputAdornment position="start">
                          <RiMailLine color="#000" size="20"/>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText>{errors.email && errors.email.message}</FormHelperText>
                  </FormControl>
                </div>

                <div className="mb-2">
                  <FormControl error={errors.password ? true : false}>
                    <InputLabel htmlFor="standard-adornment-password">
                      Password
                    </InputLabel>
                    <Input 
                      placeholder="Masukan password"
                      className="w-56"
                      type={values.showPassword ? 'text' : 'password'}
                      {...register("password", { required: 'wajib diisi' })}
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
                    <FormHelperText>{errors.password && errors.password.message}</FormHelperText>
                  </FormControl>
                </div>

                <div className={`${classes.wrapper} mt-4`}>
                  <Button 
                    size="medium" 
                    variant="contained" 
                    color="primary"
                    className="w-56"
                    disabled={disableBtnLogin}
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
        </div>
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
                  {...register("email", { 
                    required: 'wajib diisi',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "format e-mail tidak sesuai",
                    },
                  })}
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
