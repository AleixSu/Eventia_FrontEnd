import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API } from '../../api'

export const useCreateEvent = (token) => {
  const queryClient = useQueryClient() // llamamos al cliente donde guardamos las queries que hemos usado y usamos en esta app

  return useMutation({
    mutationFn: async (formData) => {
      //Hacemos la petición pasándole el formData.
      const result = await API({
        endpoint: '/events',
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
          'Error uploading new event'
        throw new Error(errorMsg)
      } //Gestionamos errores y resultados

      if (result.status !== 200 && result.status !== 201) {
        const errorMsg =
          result.data?.error ||
          result.data?.message ||
          result.data ||
          'An error ocurred while trying to uploado the new event'
        throw new Error(errorMsg)
      }

      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventsNames'] }) //Accedemos al cliente que hemos llamado, buscamos nuestra petición llamada eventsNames y le decimos que está obsoleta y que debe refetchearse de nuevo. Así se actualiza la lista de nombres de evento. TOP.
    }
  })
}
