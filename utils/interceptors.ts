import Axios, { AxiosInstance } from "axios";
import Cookies2 from 'js-cookie'

export function getMapValue(obj: any, key: string) {
  if (obj.hasOwnProperty(key)) {
    // console.log(obj[key])
    return obj[key];
  }
  throw new Error(
    'Invalid map key. di utils/helper.ts obj=' + JSON.stringify(obj) + ' key =' + key
  );
}

export function delayOk(params: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, params);
  })
}

export const SERVER_URL = process.env.SERVER_URL
// console.log(SERVER_URL)

export function AxiosNormal<AxiosInstance>(token?: string ) {
  let instance = Axios.create({
    baseURL: SERVER_URL,
    timeout: 30 * 1000,
    headers: {
      Authorization: `Bearer ${token}` || '-',
    }
  });

  // Add a request interceptor
  instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    try {
      if (error.response) {
        // console.log(error.response)
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 403) {
          Cookies2.remove('gwt')
          window.location.replace('/login?msgerr=token_expired')
          return Promise.reject(error)
        }

        // if unauthorized
        if (error.response.status === 401) {
          return Promise.reject(error.response.data)
        }

        if (error.response.data !== '') {
          return Promise.reject(error.response.data + ' || code:' + error.response.status)
        } else {
          return Promise.reject(error.response.status)
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message);
      }
    } catch (error) {
      // console.log(error)
    }
    // console.log(error)
    // console.log("ndak tau errornya")
    return Promise.reject(error);
  });

  return instance
}