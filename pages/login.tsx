import type { NextPage } from 'next'
import LoginForm from '@frontend/components/auth/LoginForm'
import withNonAuthHOC from '@frontend/HOC/withNonAuthHOC'

const LoginPage: NextPage = () => {
  return <LoginForm />
}

export default withNonAuthHOC(LoginPage)
