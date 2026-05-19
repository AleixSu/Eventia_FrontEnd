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
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const result = await API({
          endpoint: '/users/profile',
          method: 'GET'
        })

        if (result.status === 200) {
          setUser(result.data)
          setIsAuthenticated(true)
        } else {
          setUser(null)
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)

        setUser(null)
        setIsAuthenticated(false)
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
      setIsAuthenticated(true)
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

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData)
  }

  const logOut = async () => {
    await API({
      endpoint: '/users/logout',
      method: 'POST'
    })
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('userId')
    window.scrollTo(0, 0)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
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
