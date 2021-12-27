
import type { Property } from '../../services/propertiesService'
import { Fragment, useEffect, useState } from 'react'
import { getPropertiesService } from '../../services/propertiesService'


const PropertiesTable = () => {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    getPropertiesService()
      .then(resp => {
        setProperties(resp.data)
        setIsLoading(false)
      }).catch(err => console.log({err}))
  }, [])

  return (
    <Fragment>
      { !isLoading && properties && properties.map(property => (
          <div key={property.id}>
            <p>{property.address}</p>
            <p>{property.apartmentNumber}</p>
            <p>{property.price}</p>
            <p>{property.status}</p>
          </div>
        ))
      }

    </Fragment>
  )
}

export default PropertiesTable
