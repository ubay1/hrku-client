import { AxiosNormal } from "../utils/interceptors"

const SERVER_URL = process.env.SERVER_URL
export async function HTTPGetProfil(param: {token: string}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).get(`${SERVER_URL}/user/profil`)
      return resolve(response)
    } catch (error) {
      return reject(error)
    }
  })
}