import { Button, Card, CardContent, CircularProgress, createTheme, FormControl, FormHelperText, Input, InputAdornment, InputLabel, makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { Router, useRouter } from 'next/router';
import React from 'react'
import { useForm } from 'react-hook-form';
import { RiArrowLeftLine, RiMailLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Slide, toast } from 'react-toastify';
import { HTTPForgotPassword } from '../../api/auth';
import { useAuth } from '../../context/authContext';
import Auth from '../../layout/auth';
import { AppDispatch } from '../../store';
import forgotPwd, { setForgotPwdEmail } from '../../store/forgotPwd';
import { RootState } from '../../store/rootReducer';
import { IForgotPwdValidation } from '../../types/formValidation';
import Header from './components/Header';

const useStyles = makeStyles({
  bgPrimary: {
    backgroundColor: blue[500]
  },
  colorPrimary: {
    color: blue[500]
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

const ForgotPasswordPage = () => {
  toast.configure()
  
  /* -------------------------------------------------------------------------- */
  /*                                   hooks                                    */
  /* -------------------------------------------------------------------------- */
  const classes = useStyles();
  const router = useRouter();
  const { auth } = useAuth()

  const dispatch: AppDispatch = useDispatch()
  const forgotPwdRedux = useSelector((state: RootState) => state.forgotPwd);

  const [loadingSubmitForgotPwd, setLoadingSubmitForgotPwd] = React.useState(false);
  const [disableBtnForgotPwd, setDisableBtnForgotPwd] = React.useState(false);
  const [loadingPage, setloadingPage] = React.useState<any>(null)

  React.useEffect(() => {
    if (auth.status === "SIGNED_OUT") {
      setloadingPage('false')
    }

    if (auth.status === "SIGNED_IN") {
      setloadingPage('true')
      window.location.replace('/')
    }
  }, []) 

  React.useEffect(() => {
    console.log(loadingPage)
  }, [loadingPage])
  
  /* -------------------------------------------------------------------------- */
  /*                                   handle form                              */
  /* -------------------------------------------------------------------------- */
  const { register: registerForgotPwd, handleSubmit: handleSubmitForgotPwd, reset, formState: { errors: errorsForgotPwd } } = useForm<IForgotPwdValidation>();
  const submitForgotPwd = ({ email }: IForgotPwdValidation) => {
    htttpForgotPassword({ email: email })
  };

  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const htttpForgotPassword = async (params: { email: string }) => {
    setLoadingSubmitForgotPwd(true)
    setDisableBtnForgotPwd(true)

    try {
      const response = await HTTPForgotPassword({
        email: params.email,
      })

      console.log('resposne forgot pwd = ', response)

      toast('kode otp telah dikirim ke email', {
        position: "bottom-right",
        autoClose: 5000,
        type: 'success',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        transition: Slide
      })

      reset(response)

      dispatch(setForgotPwdEmail({email: params.email}))

      router.push({
        pathname: 'forgot_password/verif_otp',
      })

      setLoadingSubmitForgotPwd(false)
      setDisableBtnForgotPwd(false)
    } catch (error) {
      const errors = JSON.parse(JSON.stringify(error))
      console.log(errors)
      if (errors.status === 403) {
        toast(errors.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          type: 'error',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          transition: Slide
        })
      }
      setLoadingSubmitForgotPwd(false)
      setDisableBtnForgotPwd(false)
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */
  
  return (
    <Auth loading={loadingPage}>
      <Header 
        step={1}
        title="Lupa Password" 
        show2={forgotPwdRedux.email !== '' ? true : false} 
        title2={forgotPwdRedux.email !== '' ? 'Verif Otp' : ''}
        routeName="forgot_password/verif_otp"
      />
      
      <div className="mt-10 flex flex-col justify-center m-auto laptop:w-1/2 phone:w-4/5 xphone:w-11/12">
        <Card>
          <CardContent className="my-0">
            <form
              onSubmit={handleSubmitForgotPwd(submitForgotPwd)}
              autoComplete="on"
            >
                <div className="mb-8 mt-6">
                  <FormControl className="w-full" error={errorsForgotPwd.email ? true : false}>
                    <InputLabel htmlFor="standard-adornment-email">
                      Email
                    </InputLabel>
                    <Input
                      placeholder="Masukan email"
                      className=""
                      {...registerForgotPwd("email", {
                        required: 'wajib diisi',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "format e-mail tidak sesuai",
                        },
                      })}
                      startAdornment={
                        <InputAdornment position="start">
                          <RiMailLine color="#000" size="20" />
                        </InputAdornment>
                      }
                    />
                    <FormHelperText>{errorsForgotPwd.email && errorsForgotPwd.email.message}</FormHelperText>
                  </FormControl>
                </div>
                <div className="flex justify-end">
                  <div className="relative w-full">
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      disabled={disableBtnForgotPwd}
                      type="submit"
                      fullWidth={true}
                    >
                      Kirim
                    </Button>
                    {loadingSubmitForgotPwd && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Auth>
  )
}

export default ForgotPasswordPage
