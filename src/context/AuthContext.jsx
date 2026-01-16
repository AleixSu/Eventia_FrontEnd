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
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token')
      const storedUserId = localStorage.getItem('userId')

      if (storedToken && storedUserId) {
        setToken(storedToken)

        try {
          const result = await API({
            endpoint: `/users/${storedUserId}`,
            method: 'GET',
            token: storedToken
          })

          if (result.status === 200) {
            setUser(result.data)
            setIsAuthenticated(true)
          } else {
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            setToken(null)
          }
        } catch (error) {
          console.error('Error fetching user:', error)
          localStorage.removeItem('token')
          localStorage.removeItem('userId')
          setToken(null)
        }
      }
      setLoading(false)
    }

    initializeAuth()
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
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userId', response.data.user._id)
      window.scrollTo(0, 0)

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
        const errorMessage = response.data || 'Registration failed'
        throw new Error(errorMessage.error)
      }

      setUser(response.data.user)
      setToken(response.data.token)
      setIsAuthenticated(true)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userId', response.data.user._id)
      window.scrollTo(0, 0)

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData)
  }

  const logOut = () => {
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    window.scrollTo(0, 0)
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
        logOut,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
