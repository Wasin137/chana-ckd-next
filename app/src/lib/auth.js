import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const baseUrl_api = "https://chana-ckd-api.vercel.app"

export const authOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
          name: "password",
          credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            // You need to provide your own logic here that takes the credentials
            // submitted and returns either a object representing a user or value
            // that is false/null if the credentials are invalid.
            // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
            // You can also use the `req` object to obtain additional parameters
            // (i.e., the request IP address)
            const res = await fetch(`${baseUrl_api}/api/login`, {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" }
            })
            const response = await res.json()
      
            // If no error and we have user data, return it
            if (response.user) {
              return response.user
            }
            // Return null if user data could not be retrieved
            return null
          }
        })
    ]
}