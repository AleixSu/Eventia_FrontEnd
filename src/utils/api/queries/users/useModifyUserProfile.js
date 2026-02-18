import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { API } from '../../api'

export const useModifyUserProfile = (token) => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (body) => {
      const result = await API({
        endpoint: `/users/getUserByEmail`,
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
          'User not found'
        throw new Error(errorMsg)
      }
    },
    onSuccess: (data) => {
      setTimeout(() => {
        navigate(`/admin_area/edit_user/${data._id}`, {
          state: { user: data }
        })
      }, 500)
    }
  })
}
