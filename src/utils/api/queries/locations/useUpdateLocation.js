import { useMutation } from '@tanstack/react-query'
import { API } from '../../api'

export const useUpdateLocation = (token) => {
  return useMutation({
    mutationFn: async ({ formData, locationId }) => {
      const result = await API({
        endpoint: `/locations/${locationId}`,
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
          'Error updating the location'
        throw new Error(errorMsg)
      }
    }
  })
}
