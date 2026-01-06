import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../../context/AuthContext'
import './RegisterForm.css'
import { useModalContext } from '../../../context/ModalContext'

const RegisterForm = ({ onSuccess }) => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { registerUser, logIn } = useAuthContext()
  const { closeLogin } = useModalContext()

  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      nickName: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values) => {
    setError('')
    setSuccess(false)

    const result = await registerUser(
      values.nickName,
      values.email,
      values.password
    )

    if (result.success) {
      onSuccess?.()
      const resultLogin = await logIn(values.email, values.password)

      if (resultLogin.success) {
        setSuccess(true)
        setTimeout(() => {
          onSuccess?.()
          closeLogin()
        }, 1500)
      } else {
        setError(resultLogin.error)
      }
    } else {
      setError(result.error)
    }
  }

  return (
    <div className='formContainer signUpContainer'>
      <form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
        <h1>Create Account</h1>

        <input
          {...register('nickName', {
            required: 'Enter your username, please!'
          })}
          type='text'
          placeholder='Username'
          id='nickName'
          className={formState.errors.nickName ? 'redInput' : ''}
        />

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
            required: 'Enter your password, please!',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          })}
          type='password'
          placeholder='Password'
          id='password'
          className={formState.errors.password ? 'redInput' : ''}
        />

        {error && <p className='formError'>{error}</p>}
        {success && <p>Profile created!</p>}

        {(formState.errors.nickName ||
          formState.errors.email ||
          formState.errors.password) && (
          <p className='formError'>Please fill in all required fields.</p>
        )}

        <button id='signInButton' type='submit' disabled={success}>
          {success ? 'Creating profile..' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default RegisterForm
