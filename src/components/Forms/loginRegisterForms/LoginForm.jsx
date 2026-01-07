import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../../context/AuthContext'
import './LoginForm.css'
import { useModalContext } from '../../../context/ModalContext'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'

const LoginForm = ({ onSuccess }) => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { logIn } = useAuthContext()
  const { closeLogin } = useModalContext()

  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values) => {
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      const result = await logIn(values.email, values.password)

      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          onSuccess?.()
          closeLogin()
        }, 1500)
      } else {
        setError(result.error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='formContainer signInContainer'>
      <form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign In</h1>

        <input
          {...register('email', {
            required: 'Enter your email, please!'
          })}
          type='email'
          placeholder='Email'
          id='email'
          className={formState.errors.email ? 'redInput' : ''}
        />

        <input
          {...register('password', {
            required: 'Enter your password, please!'
          })}
          type='password'
          placeholder='Password'
          id='password'
          className={formState.errors.password ? 'redInput' : ''}
        />

        {error && <p className='formError'>{error}</p>}
        {formState.errors.email || formState.errors.password ? (
          <p className='formError'>Please fill in all required fields.</p>
        ) : (
          ''
        )}
        <button id='signInButton' type='submit' disabled={success}>
          Sign In
        </button>
        {loading ? (
          <LoadingIcon size={25} borderSize={2} />
        ) : success ? (
          <span className='succesSpan'>Logged!</span>
        ) : null}
      </form>
    </div>
  )
}

export default LoginForm
