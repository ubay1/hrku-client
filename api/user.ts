import { AxiosNormal } from "../utils/interceptors"

interface IUpdateProfil {
  token: string;
  fullname: string;
  address: string;
  phone: string;
  gender: string;
  roleId: string;
}

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

export async function HTTPUpdateFotoProfil(param: {foto: string, token: string}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(`${SERVER_URL}/user/updateFotoProfil`, {
        foto: param.foto
      })
      return resolve(response)
    } catch (error) {
      return reject(error)
    }
  })
}

export async function HTTPUpdateProfil(param: IUpdateProfil): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await AxiosNormal(param.token).post(`${SERVER_URL}/user/updateProfil`, {
        fullname: param.fullname,
        address: param.address,
        phone: param.phone,
        gender: param.gender,
        roleId: param.roleId,
      })
      return resolve(response)
    } catch (error) {
      return reject(error)
    }
  })
}