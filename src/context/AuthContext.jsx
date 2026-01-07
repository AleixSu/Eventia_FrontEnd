import { createContext, useContext, useEffect, useState } from 'react'
import { API } from '../utils/api/api'

const AuthContext = createContext(null)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth has to be used inside AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const logIn = async (email, password) => {
    const body = { email, password }
    try {
      const response = await API({
        endpoint: '/users/login',
        body,
        method: 'POST'
      })
      if (response.status !== 200) {
        throw new Error(response.data.message || 'Email or password incorrect!')
      }
      setUser(response.data.user)
      setToken(response.data.token)
      setIsAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('token', response.data.token)

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const registerUser = async (nickName, email, password) => {
    const body = { nickName, email, password }
    try {
      const response = await API({
        endpoint: '/users/register',
        body,
        method: 'POST'
      })
      if (response.status !== 200 && response.status !== 201) {
        // Accede al mensaje de error desde response.data
        const errorMessage = response.data || 'Registration failed'
        throw new Error(errorMessage.error)
      }

      setUser(response.data.user)
      setToken(response.data.token)
      setIsAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('token', response.data.token)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logOut = () => {
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        logIn,
        registerUser,
        logOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
