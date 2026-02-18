import { useMutation } from '@tanstack/react-query'
import { API } from '../../api'

export const useDeleteEvent = (token) => {
  return useMutation({
    mutationFn: async (eventId) => {
      const result = await API({
        endpoint: `/events/${eventId}`,
        method: 'DELETE',
        token: token
      })
      if (result.status !== 200 && result.status !== 201) {
        const errorMsg =
          result.data?.error ||
          result.data?.message ||
          result.data ||
          'Error deleting this event'
        throw new Error(errorMsg)
      }
      return result.data
    }
  })
}
