import React, { createContext } from "react";
import Cookies from "js-cookie";
import { HTTPGetProfil } from "../api/user";

const AuthContext = createContext<any>({})

export const getUser = async (ctx: any) => {
  // const tokenCookies = Cookies.get('token')
  // console.log('cookies = ', tokenCookies)

  // if(ctx?.req?.headers?.cookie === undefined) {
  //   console.log(ctx?.req?.headers?.cookie)
  //   return { status: 'SIGNED_OUT' };
  // } else {
  //   let replaceToken = ''
  //   const a = JSON.parse(JSON.stringify(ctx?.req?.headers?.cookie))
  //   let splitt = a.split(" ");
    
  //   for (var j = 0; j < splitt.length; j++) {
  //     if (splitt[j].match('token')) {
  //       const replaceToken2 = splitt[j].replace('token=','');
  //       replaceToken = replaceToken2;
  //     }
  //   }

  //   console.log('ctx token = ',replaceToken)

  // }
  try {
    let replaceToken = ''
    const a = JSON.parse(JSON.stringify(ctx?.req?.headers?.cookie))
    let splitt = a.split(" ");
    
    for (var j = 0; j < splitt.length; j++) {
      if (splitt[j].match('token')) {
        const replaceToken2 = splitt[j].replace('token=','');
        replaceToken = replaceToken2;
      }
    }

    const response = await HTTPGetProfil({ token: replaceToken})
    return { status: 'SIGNED_IN', user: 'notnull'};
  } catch (error) {
    return { status: 'SIGNED_OUT', user: null };
  }
}

export const AuthProvider = (props: any) => {
  const auth = props.myAuth || { status: 'SIGNED_OUT', user: null };
  
  return <AuthContext.Provider value={{ auth }} {...props} />;
}

export const useAuth = () => React.useContext(AuthContext);
// export const AuthConsumer = AuthContext.Consumer;