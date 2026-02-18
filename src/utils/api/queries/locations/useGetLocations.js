import { useQuery } from '@tanstack/react-query'
import { API } from '../../api'

export const useGetLocations = () => {
  return useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const response = await API({
        endpoint: '/locations'
      })

      if (response.status === 404) {
        return []
      } else if (response.status === 200) {
        return response.data
      } else {
        throw new Error('Failed to load the locations')
      }
    }
  })
}
