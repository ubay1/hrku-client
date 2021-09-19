import { AxiosNormal } from "../utils/interceptors"

const SERVER_URL = process.env.SERVER_URL
export async function HTTPGetAllRole(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal().get(`${SERVER_URL}/role`)
      return resolve(response)
    } catch (error) {
      return reject(error)
    }
  })
}