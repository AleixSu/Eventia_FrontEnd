import { useMutation } from '@tanstack/react-query'
import { API } from '../../api'

export const useUpdateUser = (token) => {
  return useMutation({
    mutationFn: async ({ formData, userId }) => {
      const result = await API({
        endpoint: `/users/${userId}`,
        body: formData,
        method: 'PATCH',
        isJSON: false,
        token: token
      })
      if (result.status !== 200 && result.status !== 201) {
        const errorMsg =
          result.data?.error ||
          result.data?.message ||
          result.data ||
          'Error updating your profile'
        throw new Error(errorMsg)
      }
      return result.data
    }
  })
}
