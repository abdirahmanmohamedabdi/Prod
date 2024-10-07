import React from 'react'
import { doSocialLogin } from '../actions'
const LoginForm = () => {
  return (
   <form action={doSocialLogin}>
    <button type="submit" name="action" value="google" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
 Sign in with google
 </button>
 <button type="submit" name="action" value="github" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
 Sign in with Github
 </button>
   </form>
  )
}

export default LoginForm