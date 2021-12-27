import { MouseEvent } from 'react'
import { Fragment } from 'react'
import { logoutService } from '@frontend/services/authService'
import { useRouter } from 'next/router'

const PropertiesTable = () => {
  const router = useRouter()
  const onHandleClickLogout = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    logoutService()
      .then(() => {
        localStorage.removeItem("accessToken")
        router.push("/login")
      })
      .catch(err => console.log(err))
  }

  return (
    <Fragment>
      <div><h1>This is properties table</h1></div>

    </Fragment>
  )
}

export default PropertiesTable
