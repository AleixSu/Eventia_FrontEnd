import { useMutation } from '@tanstack/react-query'
import { API } from '../../api'

export const useUpdateEvent = (token) => {
  return useMutation({
    mutationFn: async ({ formData, eventId }) => {
      const result = await API({
        endpoint: `/events/${eventId}`,
        body: formData,
        method: 'PATCH',
        isJSON: false,
        token: token
      })
      if (result.status === 200 || result.status === 201) {
        return result.data
      } else {
        const errorMsg =
          result.data?.error ||
          result.data?.message ||
          result.data ||
          'Error updating the event'
        throw new Error(errorMsg)
      }
    }
  })
}
