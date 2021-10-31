import { Button, Card, CardContent, CircularProgress, createTheme, FormControl, FormHelperText, Input, InputAdornment, InputLabel, makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { RiArrowLeftLine, RiKey2Line, RiShieldKeyholeLine } from 'react-icons/ri';
import { Slide, toast } from 'react-toastify';
import { HTTPCheckResetPwdToken, HTTPForgotPassword, HTTPResetPwd } from '../../../api/auth';
import { IResetPwdValidation } from '../../../types/formValidation';
import Header from '../components/Header';
import { useRouter } from 'next/router'
import { AppDispatch, store } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { setForgotPwdEmail, setForgotPwdReset } from '../../../store/forgotPwd';

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

const ResetPwdPage = () => {
  toast.configure()
  const dispatch: AppDispatch = useDispatch()
  const loadingRedux = useSelector((state: RootState) => state.loading);
  const userRedux = useSelector((state: RootState) => state.user);
  const forgotPwdRedux = useSelector((state: RootState) => state.forgotPwd);
  
  /* -------------------------------------------------------------------------- */
  /*                                   hooks                                    */
  /* -------------------------------------------------------------------------- */
  const classes = useStyles();
  const router = useRouter();
  
  const [loadingSubmitResetPwd, setLoadingSubmitResetPwd] = React.useState(false);
  const [disableBtnResetPwd, setDisableBtnResetPwd] = React.useState(false);
  const [emailOtp, setemailOtp] = React.useState('');
  
  useEffect(() => {
    let mounted = true
    
    if (mounted) {
      checkPwd()
    }

    return () => {
      mounted = false
    }
  }, [])

  /* -------------------------------------------------------------------------- */
  /*                                   handle form                              */
  /* -------------------------------------------------------------------------- */
  const { register: registerResetPwd, handleSubmit: handleSubmitResetPwd, reset, formState: { errors: errorsResetPwd } } = useForm<IResetPwdValidation>();
  const submitResetPwd = ({ new_password, new_password_confirm }: IResetPwdValidation) => {
    htttpResetPwd({ new_password, new_password_confirm })
  };

  /* -------------------------------------------------------------------------- */
  /*                                   method                                   */
  /* -------------------------------------------------------------------------- */
  const htttpResetPwd = async ({ new_password, new_password_confirm }: IResetPwdValidation) => {
    setLoadingSubmitResetPwd(true)
    setDisableBtnResetPwd(true)

    try {
      const response = await HTTPResetPwd({
        email: forgotPwdRedux.email,
        new_password: new_password,
        new_password_confirm: new_password_confirm
      })

      console.log('resposne reset pwd = ', response)

      toast('password berhasil diperbaharui', {
        position: "bottom-right",
        autoClose: 5000,
        type: 'success',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        transition: Slide
      })

      reset(response)

      setLoadingSubmitResetPwd(false)
      setDisableBtnResetPwd(false)
      dispatch(setForgotPwdReset({ email: '', otp: false }))
      router.push('/login')
      
    } catch (error) {
      const errors = JSON.parse(JSON.stringify(error))
      // console.log(errors.data.message)

      setLoadingSubmitResetPwd(false)
      setDisableBtnResetPwd(false)

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
  }

  const checkPwd = async () => {
    try {
      const response = await HTTPCheckResetPwdToken({ email: forgotPwdRedux.email })
      // console.log(response)
      // const data = response.data.data
    } catch (error) {
      // console.log(error)
      dispatch(setForgotPwdReset({email: '', otp: false}))
      alert('mohon maaf, anda tidak mendapatkan akses ke halaman ini')
      router.back()
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                   show page                                */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      <Header 
        step={3}
        title="Reset Password" 
      />

      <div className="mt-10 flex flex-col justify-center m-auto laptop:w-1/2 phone:w-4/5 xphone:w-11/12">
        <Card>
          <CardContent className="my-0">
            <form
              onSubmit={handleSubmitResetPwd(submitResetPwd)}
              autoComplete="on"
              className=""
            >
              <div className="m-5">
                <div className="mb-8 mt-6">
                  <FormControl className="w-full" error={errorsResetPwd.new_password ? true : false}>
                    <InputLabel htmlFor="standard-adornment-new_password">
                      Password Baru
                    </InputLabel>
                    <Input
                      placeholder="Masukan Password baru"
                      className=""
                      {...registerResetPwd("new_password", {
                        required: 'wajib diisi',
                      })}
                      startAdornment={
                        <InputAdornment position="start">
                          <RiKey2Line color="#000" size="20" />
                        </InputAdornment>
                      }
                    />
                    <FormHelperText>{errorsResetPwd.new_password && errorsResetPwd.new_password.message}</FormHelperText>
                  </FormControl>
                </div>

                <div className="mb-8 mt-6">
                  <FormControl className="w-full" error={errorsResetPwd.new_password_confirm ? true : false}>
                    <InputLabel htmlFor="standard-adornment-new_password_confirm">
                      Konfirmasi Password Baru
                    </InputLabel>
                    <Input
                      placeholder="Masukan Konfirmasi Password baru"
                      className=""
                      {...registerResetPwd("new_password_confirm", {
                        required: 'wajib diisi',
                      })}
                      startAdornment={
                        <InputAdornment position="start">
                          <RiKey2Line color="#000" size="20" />
                        </InputAdornment>
                      }
                    />
                    <FormHelperText>{errorsResetPwd.new_password_confirm && errorsResetPwd.new_password_confirm.message}</FormHelperText>
                  </FormControl>
                </div>

                <div className="flex justify-end">
                  <div className="relative w-full">
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      disabled={disableBtnResetPwd}
                      type="submit"
                      fullWidth={true}
                    >
                      Kirim
                    </Button>
                    {loadingSubmitResetPwd && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default ResetPwdPage

// export async function getServerSideProps(context: any) {
//   try {
//     const dataUser = store.getState()
//     const email = dataUser.forgotPwd.email
//     console.log(email)
//     const response = await HTTPCheckResetPwdToken({ email:  email})
//     console.log(response)
//       // const data = response.data.data
//     return {
//       props: {
//         data: JSON.parse(JSON.stringify('ubay'))
//       },
//     }
//   } catch (error) {
//     console.log(error)
//     return {
//       props: {
//         data: JSON.parse(JSON.stringify('error'))
//       },
//     }
//   }
// }