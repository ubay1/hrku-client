import { Button, Card, CardContent, CircularProgress, createTheme, FormControl, FormHelperText, Input, InputAdornment, InputLabel, makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { RiArrowLeftLine, RiShieldKeyholeLine } from 'react-icons/ri';
import { Slide, toast } from 'react-toastify';
import { HTTPForgotPassword, HTTPVerifOtp } from '../../../api/auth';
import { IVerifOtpValidation } from '../../../types/formValidation';
import Header from '../components/Header';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { setEmail, setOtp } from '../../../store/forgotPwd';

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

const VerifOtpPage = () => {
  toast.configure()
  
  /* -------------------------------------------------------------------------- */
  /*                                   hooks                                    */
  /* -------------------------------------------------------------------------- */
  const classes = useStyles();
  const router = useRouter();

  const dispatch: AppDispatch = useDispatch()
  const forgotPwdRedux = useSelector((state: RootState) => state.forgotPwd);
  
  const [loadingSubmitVerifOtp, setLoadingSubmitVerifOtp] = React.useState(false);
  const [disableBtnVerifOtp, setDisableBtnVerifOtp] = React.useState(false);
  const [emailOtp, setemailOtp] = React.useState<any>('');
  
  useEffect(() => {
    let mounted = true
    
    if (mounted) {
      if(forgotPwdRedux.email === '') {
        alert('mohon maaf anda belum memasukan email')
        return router.back()
      } else {
        setemailOtp(forgotPwdRedux.email)
      }
    }

    return () => {
      mounted = false
    }
  }, [])

  /* -------------------------------------------------------------------------- */
  /*                                   handle form                              */
  /* -------------------------------------------------------------------------- */
  const { register: registerVerifOtp, handleSubmit: handleSubmitVerifOtp, reset, formState: { errors: errorsVerifOtp } } = useForm<IVerifOtpValidation>();
  const submitVerifOtp = ({ otp }: IVerifOtpValidation) => {
    htttpVerifOtp({ otp: otp })
  };

  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const htttpVerifOtp = async (params: { otp: string }) => {
    setLoadingSubmitVerifOtp(true)
    setDisableBtnVerifOtp(true)

    try {
      const response = await HTTPVerifOtp({
        email: emailOtp,
        otp: params.otp,
      })

      console.log('resposne verif otp = ', response)

      toast('kode otp sesuai', {
        position: "bottom-right",
        autoClose: 5000,
        type: 'success',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        transition: Slide
      })

      reset(response)

      dispatch(setOtp({otp: true}))

      setLoadingSubmitVerifOtp(false)
      setDisableBtnVerifOtp(false)

      router.push('/forgot_password/reset_password')
    } catch (error) {
      const errorOtp = JSON.parse(JSON.stringify(error))
      console.log(errorOtp.data.message)

      setLoadingSubmitVerifOtp(false)
      setDisableBtnVerifOtp(false)

      toast(errorOtp.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        type: 'error',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        transition: Slide
      })

      dispatch(setEmail({email: ''}))
      router.push('/forgot_password')
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      <Header 
        title="Verif OTP" 
        show2={forgotPwdRedux.otp === true ? true : false}
        title2={forgotPwdRedux.otp === true ? 'Reset Password' : ''}
        routeName="/forgot_password/reset_password"
      />

      <div className="mt-10 flex flex-col justify-center m-auto laptop:w-1/2 phone:w-4/5 xphone:w-11/12">
        <Card>
          <CardContent className="my-0">
            <form
              onSubmit={handleSubmitVerifOtp(submitVerifOtp)}
              autoComplete="on"
            >
              <div className="mb-8 mt-6">
                <FormControl className="w-full" error={errorsVerifOtp.otp ? true : false}>
                  <InputLabel htmlFor="standard-adornment-otp">
                    OTP
                  </InputLabel>
                  <Input
                    placeholder="Masukan OTP"
                    className=""
                    {...registerVerifOtp("otp", {
                      required: 'wajib diisi',
                    })}
                    startAdornment={
                      <InputAdornment position="start">
                        <RiShieldKeyholeLine color="#000" size="20" />
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>{errorsVerifOtp.otp && errorsVerifOtp.otp.message}</FormHelperText>
                </FormControl>
              </div>
              <div className="flex justify-end">
                <div className="relative w-full">
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    disabled={disableBtnVerifOtp}
                    autoFocus
                    type="submit"
                    fullWidth={true}
                  >
                    Kirim
                  </Button>
                  {loadingSubmitVerifOtp && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

// VerifOtpPage.getInitialProps = async ({ query }: any) => {
//   const { email } = query

//   return { email }
// }


export default VerifOtpPage
