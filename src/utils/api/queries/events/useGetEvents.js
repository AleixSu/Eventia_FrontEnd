import { useQuery } from '@tanstack/react-query'
import { API } from '../../api'

export const useGetEvents = (enabled = true) => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await API({
        endpoint: '/events'
      })

      return response.data
    },
    enabled: enabled
  })
}
