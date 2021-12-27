import type { NextPage } from 'next'
import PropertiesTable from '@frontend/components/properties'
import withAuthenticationHOC from '@frontend/HOC/withAuthenticationHOC'

const PropertiesPage: NextPage = () => {
  return <PropertiesTable />
}

export default withAuthenticationHOC(PropertiesPage)
