import { useQuery } from '@tanstack/react-query'
import { API } from '../../api'

export const useGetCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const response = await API({
        endpoint: '/locations/countries'
      })

      if (response.status !== 200) {
        throw new Error(
          'An error has ocurred while trying to load the countries'
        )
      } else if (response.status === 200) {
        return response.data.sort((a, b) => a.country.localeCompare(b.country))
      }
    }
  })
}
