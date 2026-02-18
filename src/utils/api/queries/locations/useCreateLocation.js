import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API } from '../../api'

export const useCreateLocation = (token) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (formData) => {
      const result = await API({
        endpoint: '/locations',
        body: formData,
        method: 'POST',
        isJSON: false,
        token: token
      })

      if (result.status !== 200 && result.status !== 201) {
        const errorMsg =
          result.data?.error ||
          result.data?.message ||
          result.data ||
          'Error uploading new location'
        throw new Error(errorMsg)
      }
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] })
    }
  })
}
