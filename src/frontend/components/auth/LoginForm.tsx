import React, { useState } from "react"
import { loginService } from "@frontend/services/authService"
import { useRouter } from 'next/router'

const LoginForm: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {

    e.preventDefault()
    loginService({ email, password })
      .then(() => {
        router.push("/properties")
      }).catch(err => {
        console.log({err})
      })
  }

  const onHandleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const onHandleChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
  }

  return (
    <form onSubmit={onHandleSubmit}>
      <input type="email" value={email} onChange={onHandleChangeEmail} />
      <input type="password" value={password} onChange={onHandleChangePassword} />
      <button>Submit</button>
    </form>
  )
}

export default LoginForm
