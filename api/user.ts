import { AxiosNormal } from "../utils/interceptors"

const SERVER_URL = process.env.SERVER_URL
export async function HTTPGetProfil(param: {token: string}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const responseGetAllJobSocketUser = await AxiosNormal(param.token).post(`${SERVER_URL}/user/profil`)
      return resolve(responseGetAllJobSocketUser)
    } catch (error) {
      return reject(error)
    }
  })
}