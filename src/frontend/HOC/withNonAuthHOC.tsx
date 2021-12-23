import { useRouter } from 'next/router'
import { useEffect } from 'react'
import type { FC } from 'react'

type WithNonAuthHOCFn = (Component: FC) => FC

const withNonAuthHOC: WithNonAuthHOCFn = (Component: FC) => {
  const Authenticated: FC = (): JSX.Element | null => {
    const router = useRouter()
    let accessToken: string | null = null
    if (typeof window !== 'undefined') {
      accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : ''
    }

    useEffect(() => {
      if (accessToken) router.push('/')
    }, [accessToken, router])

    return accessToken ? null : <Component />
  }

  return Authenticated
};

export default withNonAuthHOC
