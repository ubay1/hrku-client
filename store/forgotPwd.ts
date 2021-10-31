import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ForgotPwdState {
  email?: string;
  otp?: boolean;
}

const initialState: ForgotPwdState = {
  email: '',
  otp: false
}

// Slice
const forgotPwdSlice = createSlice({
  name: 'forgotPwd',
  initialState,
  reducers: {
    setForgotPwdOtp(state, action: PayloadAction<{otp: boolean}>) {
      state.otp = action.payload.otp
    },
    setForgotPwdEmail(state, action: PayloadAction<{email: string}>) {
      state.email = action.payload.email
    },
    setForgotPwdReset(state, action: PayloadAction<ForgotPwdState>) {
      state.email = action.payload.email,
      state.otp = action.payload.otp
    },
  },
});

// Actions
export const { setForgotPwdOtp, setForgotPwdEmail, setForgotPwdReset } = forgotPwdSlice.actions
export default forgotPwdSlice.reducer