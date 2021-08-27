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
  role_name?: string,
  slug_role_name?: string,
  foto?: string,
  gender?: string,
}

export interface UserState {
  token: string | any,
  profile: IUserProfile,
}

const initialState: UserState = {
  token: '',
  profile: {
    fullname: '',
    address: '',
    phone: '',
    email: '',
    role_name: '',
    slug_role_name: '',
    foto: '',
    gender: '',
  },
}

export const expiredToken = (dispatch: AppDispatch) => {
  Cookies.remove('token')
  dispatch(setReduxUsersProfile({
    fullname: '',
    address: '',
    phone: '',
    email: '',
    role_name: '',
    slug_role_name: '',
  }))
  
  setTimeout(() => {
    window.location.replace('/login?msg=please_login');
    setTimeout(() => {
      dispatch(setLoading({
        show: false
      }))
    }, 1000);
  }, 3000)
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
        role_name: '',
        slug_role_name: '',
        foto: '',
        gender: '',
      },
    }

    try {
      const tokens = Cookies.get('token');
      
      tokens === '' ? '' : tokens
      // console.log('is token = ',tokens)
      
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

            // console.log(responseGetUser)

            if (responseGetUser.status === 200) {
              dispatch(setAuthStatus({
                token: tokens,
              }))
              dispatch(setReduxUsersProfile({
                fullname: responseGetUser.data.data.fullname,
                address: responseGetUser.data.data.address,
                phone: responseGetUser.data.data.phone,
                email: responseGetUser.data.data.email,
                role_name: responseGetUser.data.data.role.role_name,
                slug_role_name: responseGetUser.data.data.role.slug_role_name,
                foto: responseGetUser.data.data.role.foto,
                gender: responseGetUser.data.data.role.gender,
              }))
            }

          } catch (error) {
            console.log(error)
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
      state.profile.email = action.payload.email,
      state.profile.role_name = action.payload.role_name,
      state.profile.slug_role_name = action.payload.slug_role_name
      state.profile.foto = action.payload.foto
      state.profile.gender = action.payload.gender
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