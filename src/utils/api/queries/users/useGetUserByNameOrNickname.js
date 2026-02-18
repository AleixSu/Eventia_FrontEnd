import { useMutation } from '@tanstack/react-query'
import { API } from '../../api'

export const useGetUserByNameOrNickname = (token) => {
  return useMutation({
    mutationFn: async (body) => {
      const result = await API({
        endpoint: '/users/getUsersByNameOrNickname',
        method: 'POST',
        body: body,
        token: token
      })
      if (result.status !== 200 && result.status !== 201) {
        const errorMsg =
          result.data?.error ||
          result.data?.message ||
          result.data ||
          'Error getting the users'
        throw new Error(errorMsg)
      }
      return result.data
    }
  })
}
