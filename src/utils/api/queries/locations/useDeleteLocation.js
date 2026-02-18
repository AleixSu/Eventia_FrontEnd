import { useMutation } from '@tanstack/react-query'
import { API } from '../../api'

export const useDeleteLocation = (token) => {
  return useMutation({
    mutationFn: async (locationId) => {
      const result = await API({
        endpoint: `/locations/${locationId}`,
        method: 'DELETE',
        token: token
      })
      if (result.status !== 200 && result.status !== 201) {
        const errorMsg =
          result.data?.error ||
          result.data?.message ||
          result.data ||
          'Error deleting this location'
        throw new Error(errorMsg)
      }
      return result.data
    }
  })
}
