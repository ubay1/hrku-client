import { AxiosNormal } from "../utils/interceptors"

const SERVER_URL = process.env.SERVER_URL

export async function HTTPSubmitLogin(param: {email: string, password: string}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        email: param.email,
        password: param.password
      }

      const response = await AxiosNormal().post(`${SERVER_URL}/user/login`, data)
      return resolve(response)
    } catch (error) {
      return reject(error)
    }
  })
}

export async function HTTPSubmitLogout(param: {token: string}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(`${SERVER_URL}/user/logout`)
      return resolve(response)
    } catch (error) {
      return reject(error)
    }
  })
}