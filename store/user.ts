/* eslint-disable @typescript-eslint/no-unused-vars */
// import { HTTPGetUser } from '../pages/login/script';
// import { setLoadingAuth } from './loadingAuth';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '.';
import { setLoading } from './loading';
import Cookies from 'js-cookie';
import { HTTPGetProfil } from '../api/user';

export interface IUserProfile {
  id?: string,
  fullname?: string,
  address?: string,
  phone?: string,
  email?: string,
}

export interface UserState {
  token: string | any,
  // loginWith: string;
  profile: IUserProfile,
}

const initialState: UserState = {
  token: '',
  profile: {
    fullname: '',
    address: '',
    phone: '',
    email: '',
  },
}

export const expiredToken = (dispatch: AppDispatch) => {
  Cookies.remove('token')
  dispatch(setReduxUsersProfile({
    fullname: '',
    address: '',
    phone: '',
    email: '',
  }))
}

// untuk ambil data user
export const initialStateUserAuthByAsync = async (dispatch: AppDispatch) => {
  return new Promise<UserState>(async (resolve, reject) => {
    let defaultValue: UserState = {
      token: '',
      profile: {
        fullname: '',
        address: '',
        phone: '',
        email: '',
      },
    }

    try {

      const tokens = Cookies.get('token');
      tokens === '' ? '' : tokens

      if (typeof tokens === 'undefined') {
        expiredToken(dispatch)
      } else {
        if (tokens === '') {
          expiredToken(dispatch)
        } else {
          // jika token ada
          try {
            const responseGetUser = await HTTPGetProfil({
              token: tokens
            })

            console.log(responseGetUser)

            // if (responseGetUser.status === 200) {
            //   // console.log('get user');
            //   dispatch(setReduxUsersProfile({
            //     // id: responseGetUser.data.id,
            //     name: responseGetUser.data.data.name,
            //     phone: responseGetUser.data.data.phone,
            //     email: responseGetUser.data.data.email,
            //     email_verif: responseGetUser.data.data.email_verif,
            //     photo: responseGetUser.data.data.photo,
            //     background_image: responseGetUser.data.data.background_image,
            //     recruiter: responseGetUser.data.data.recruiter,
            //     job_seeker: responseGetUser.data.data.job_seeker,
            //     gender: responseGetUser.data.data.gender,
            //   }))
            // }

            dispatch(setAuthStatus({
              token: defaultValue.token,
            }))

            // dispatch(setLoadingAuth({ loadingAuth: false }))

          } catch (error) {
            console.log(error)
            // dispatch(setLoadingAuth({ loadingAuth: false }))
          }
        }
      }
    } catch (e: any) {
      // error reading value
      console.trace(e.message)
    }
    return defaultValue
  })
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setReduxUsersProfile(state, action: PayloadAction<IUserProfile>) {
      state.profile.fullname = action.payload.fullname,
      state.profile.address = action.payload.address,
      state.profile.phone = action.payload.phone,
      state.profile.email = action.payload.email
    },

    setAuthStatus(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token
      Cookies.set('token', action.payload.token)
    },
  },
})
export const {
  setReduxUsersProfile,
  setAuthStatus,
} = userSlice.actions
export default userSlice.reducer