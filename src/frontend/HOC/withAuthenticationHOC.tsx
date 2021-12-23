import { useRouter } from 'next/router'
import { useEffect } from 'react'
import type { FC } from 'react'

type WithAuthenticationHOCFn = (Component: FC) => FC

const withAuthenticationHOC: WithAuthenticationHOCFn = (Component: FC) => {
  const Authenticated: FC = (): JSX.Element | null => {
    const router = useRouter()
    let accessToken: string | null = null
    if (typeof window !== 'undefined') {
      accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : ''
    }

    useEffect(() => {
      if (!accessToken) router.push('/login')
    }, [accessToken, router])

    return accessToken ? <Component /> : null
  }

  return Authenticated
};

export default withAuthenticationHOC
