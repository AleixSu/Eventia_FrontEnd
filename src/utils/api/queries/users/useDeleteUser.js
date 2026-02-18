import { useMutation } from '@tanstack/react-query'
import { API } from '../../api'

export const useDeleteUser = (token) => {
  return useMutation({
    mutationFn: async (userId) => {
      const result = await API({
        endpoint: `/users/${userId}`,
        method: 'DELETE',
        token: token
      })
      if (result.status !== 200 && result.status !== 201) {
        const errorMsg =
          result.data?.error ||
          result.data?.message ||
          result.data ||
          'Error deleting the user'
        throw new Error(errorMsg)
      }
      return result.data
    }
  })
}
