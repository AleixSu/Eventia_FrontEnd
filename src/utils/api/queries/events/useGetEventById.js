import { useQuery } from '@tanstack/react-query'
import { API } from '../../api'

export const useGetEventById = (id, initialEventData) => {
  return useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const response = await API({
        endpoint: `/events/${id}`
      })

      if (response.status === 200) {
        return response.data
      } else {
        throw new Error('Event not found')
      }
    },
    enabled: !!id, //Con el enabled activamos o el useQuery mediante true o false. Al poner !!id decimos que si hay id es true y se ejecuta y si no hay id entonces es false.
    initialData: initialEventData, // Aquí lo que hacemos es darle unos datos iniciales. En este caso como a nuestro componente existe la posiblidad de que le enviemos los datos de un evento desde el componente padre utilizamos esto para que tanStackQuery detecte si ya tenemos el evento o no y en el caso de no tenerlo entonces hace el fetch, pero si por initialData ya le llega los datos del evento no hace el fetch. Lo que hará será chequear el tiempo que lleva fetcheada esa info. Si lleva más tiempo del establecido por el staleTime hara un refetch. El contador del staleTime empieza en el momento en el que usamos esa info a través del initialData, no el tiempo que lleva desde que se fetcheó en el elemento padre.
    staleTime: 30 * 60 * 1000 // Tiempo que establecemos para que tanStack considere que el fetch ya está obsoleto o no. En este caso, ya que es un tipo de dato que no suele variar muy a menudo lo ponemos 30' antes de que se detecte como obsoleto y lo refetchee cuando pueda según lo tengamos configurado en nuestro queryClient(cambio de focus de ventana, reconexión de red, invalidateQueries manual, etc.. esto lo hemos configurado al principoi del todo en el main.jsx al crear el queryClient.).
  })
}
