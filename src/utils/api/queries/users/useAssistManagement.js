import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API } from '../../api'

export const useAssistManagement = (token) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ eventId, isCurrentlyGoing }) => {
      const endpoint = isCurrentlyGoing
        ? `/events/${eventId}/unsign_up`
        : `/events/${eventId}/sign_up`

      const result = await API({
        endpoint: endpoint,
        method: 'PATCH',
        token: token
      })

      if (result.status !== 200 && result.status !== 201) {
        const errorMsg =
          result.data?.error ||
          result.data?.message ||
          result.data ||
          'Error updating attendance'
        throw new Error(errorMsg)
      }

      return result.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['event', variables.eventId] }) //Aquí lo que hacemos es pasarle la clave del fetch que queremos que marque como obsoleto para que refetchee. Y para que no actualice cualquiera también le pasamos el id del evento que hemos patcheado accediendo a las variables qu le hemos pasado (eventId) mediante "variables." así sabe a que evento dirigirse exáctamente.
    }
  })
}
