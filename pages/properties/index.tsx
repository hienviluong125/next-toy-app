import type { NextPage } from 'next'

import PropertiesTable from '@frontend/components/properties'
import withAuthenticationHOC from '@frontend/HOC/withAuthenticationHOC'
import { useEffect } from 'react'
import axiosInstance from '@frontend/common/axiosInstance'

const PropertiesPage: NextPage = () => {
  useEffect(() => {
    axiosInstance.get("/api/v1/properties")
      .then(resp => {
        console.log({ resp })
      }).catch(err => {
        console.log({ err })
      })
  }, [])

  return <PropertiesTable />
}

export default withAuthenticationHOC(PropertiesPage)
