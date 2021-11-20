// import NextAuth from 'next-auth'
// import Providers from 'next-auth/providers'
// import axios from 'axios'

// const providers = [
//   Providers.Credentials({
//     name: 'Credentials',
//     authorize: async (credentials) => {
//       try {
//         const user = await axios.post(`${process.env.SERVER_URL}/user/login`,
//         {
//           user: {
//             email: credentials.email,
//             password: credentials.password,
//           }
//         },
//         {
//           headers: {
//             accept: '*/*',
//             'Content-Type': 'application/json'
//           }
//         })
      
//         if (user) {
//           return {status: 'success', data: user}
//         }
//       } catch (e) {
//         const errorMessage = e.response.data.message
//         // Redirecting to the login page with error message          in the URL
//         throw new Error(errorMessage + '&email=' + credentials.email)
//       }

//     }
//   })
// ]

// const callbacks = {
//   // Getting the JWT token from API response
//   async jwt(token, user) {
//     if (user) {
//       token.accessToken = user.token
//     }

//     return token
//   },

//   async session(session, token) {
//     session.accessToken = token.accessToken
//     return session
//   }
// }

// const options = {
//   providers,
//   callbacks,
//   pages: {
//     error: '/login' // Changing the error redirect page to our custom login page
//   }
// }

// export default (req, res) => NextAuth(req, res, options)
