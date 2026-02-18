import { useQuery } from '@tanstack/react-query'
import { API } from '../../api'

export const useGetEventsFiltered = (selectedCountries) => {
  const selectedIds = Object.values(selectedCountries)
    .filter((country) => country.selected)
    .map((country) => country.id)

  return useQuery({
    queryKey: ['events', selectedIds],
    queryFn: async () => {
      let endpoint

      if (selectedIds.length === 0) {
        endpoint = '/events'
      } else {
        const locationsParam = selectedIds.join(',')
        endpoint = `/events/location/${locationsParam}`
      }

      const response = await API({ endpoint })

      if (response.status === 200) {
        return response.data
      }
      if (response.status === 404) {
        return []
      }
      throw new Error('Failed to load events')
    }
  })
}
