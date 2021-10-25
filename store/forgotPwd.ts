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
    setOtp(state, action: PayloadAction<ForgotPwdState>) {
      state.otp = action.payload.otp
    },
    setEmail(state, action: PayloadAction<ForgotPwdState>) {
      state.email = action.payload.email
    },
  },
});

// Actions
export const { setOtp, setEmail } = forgotPwdSlice.actions
export default forgotPwdSlice.reducer