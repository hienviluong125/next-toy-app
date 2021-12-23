import type { NextPage } from 'next'
import RegisterForm from '@frontend/components/auth/RegisterForm'
import withNonAuthHOC from '@frontend/HOC/withNonAuthHOC'

const RegisterPage: NextPage = () => {
  return <RegisterForm />
}

export default withNonAuthHOC(RegisterPage)
