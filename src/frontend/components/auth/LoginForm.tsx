import React, { useState } from "react"
import { loginService } from "@frontend/services/authService"
import { useRouter } from 'next/router'
import { Alert, Button, Grid, TextField } from "@mui/material"

const LoginForm: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    loginService({ email, password })
      .then(() => {
        router.push("/properties")
      }).catch(() => {
        setError("Email or password is invalid")
      })
  }

  const onHandleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const onHandleChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >

      <Grid item xs={3}>
        {
          error &&
          <Alert
            severity="error"
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        }

        <form onSubmit={onHandleSubmit}>
          <h1>Please sign in</h1>
          <TextField
            sx={{ my: 1 }}
            label='Email'
            placeholder='Enter email'
            fullWidth
            required
            type="email"
            value={email}
            onChange={onHandleChangeEmail}
          />
          <TextField
            sx={{ my: 1 }}
            label='Password'
            placeholder='Enter password'
            fullWidth
            required
            type='password'
            value={password}
            onChange={onHandleChangePassword}
          />
          <Button sx={{ my: 1 }} type='submit' color='primary' variant="contained" fullWidth>Sign in</Button>
        </form>
      </Grid>
    </Grid>
  )
}

export default LoginForm
