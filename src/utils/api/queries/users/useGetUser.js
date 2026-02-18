import { useQuery } from '@tanstack/react-query'
import { API } from '../../api'

export const useGetUser = (userId) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await API({
        endpoint: `/users/${userId}`
      })
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error('Failed to load user data')
      }
    },
    enabled: !!userId
  })
}
