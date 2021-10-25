export type ILoginValidation = {
  email: string;
  password: string;
}

export type IForgotPwdValidation = {
  email: string;
}

export type IVerifOtpValidation = {
  email: string;
  otp: string;
}

export type IResetPwdValidation = {
  new_password: string;
  new_password_confirm: string;
}

export type IUserProfilValidation = {
  fullname: string;
  address: string;
  phone: string;
  email: string;
  foto: string;
  gender: string;
  role_name: any;
}