import { useQuery } from '@tanstack/react-query'
import { API } from '../../api'

export const useGetEventsNames = () => {
  return useQuery({
    queryKey: ['eventsNames'],
    queryFn: async () => {
      const response = await API({
        endpoint: '/events/getNameEvents'
      })
      if (response.status !== 200) {
        throw new Error(
          'An error has ocurred while trying to load the eventsNames'
        )
      } else if (response.status === 200) {
        return response.data.sort((a, b) =>
          a.eventName.localeCompare(b.eventName)
        )
      }
    }
  })
}
