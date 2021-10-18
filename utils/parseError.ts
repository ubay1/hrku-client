export const parseError = (dataError: any) => {
  return JSON.parse(JSON.stringify(dataError))
}