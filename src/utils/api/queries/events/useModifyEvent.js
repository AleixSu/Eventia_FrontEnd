import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { API } from '../../api'

export const useModifyEvent = (token) => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (body) => {
      const result = await API({
        endpoint: `/events/getEventByName`,
        body: body,
        method: 'POST',
        token: token
      })

      if (result.status === 200) {
        return result.data //
      } else {
        const errorMsg =
          result.data?.error ||
          result.data?.message ||
          result.data ||
          'Event not found'
        throw new Error(errorMsg)
      }
    },
    onSuccess: (data) => {
      setTimeout(() => {
        navigate(`/admin_area/edit_event/${data._id}`, {
          state: { event: data }
        })
      }, 500)
    }
  })
}
