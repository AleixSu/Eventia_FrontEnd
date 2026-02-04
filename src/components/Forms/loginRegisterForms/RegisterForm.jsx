import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../../context/AuthContext'
import './RegisterForm.css'
import { useModalContext } from '../../../context/ModalContext'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'

const RegisterForm = ({ onSuccess }) => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const { registerUser, logIn } = useAuthContext()
  const { closeLogin } = useModalContext()

  const { handleSubmit, register, formState, watch } = useForm({
    defaultValues: {
      nickName: '',
      email: '',
      password: ''
    }
  })

  const passwordValue = watch('password') || ''

  const hasMinLength = passwordValue.length >= 8
  const hasUpperAndLower =
    /[a-z]/.test(passwordValue) && /[A-Z]/.test(passwordValue)
  const hasNumber = /\d/.test(passwordValue)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\/'`~;]/.test(
    passwordValue
  )

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('')
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [error])

  const handleInputFocus = () => {
    if (error) {
      setError('')
    }
  }

  const onSubmit = async (values) => {
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      const result = await registerUser(
        values.nickName,
        values.email,
        values.password
      )

      if (result.success) {
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
    } finally {
      setLoading(false)
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
          onFocus={handleInputFocus}
        />

        <input
          {...register('email', {
            required: 'Enter your email, please!'
          })}
          type='email'
          placeholder='Email'
          id='email'
          className={formState.errors.email ? 'redInput' : ''}
          onFocus={handleInputFocus}
        />

        <input
          {...register('password', {
            required: 'Enter your password, please!'
          })}
          type='password'
          placeholder='Password'
          id='password'
          className={formState.errors.password ? 'redInput' : ''}
          onFocus={() => {
            setPasswordFocused(true)
            handleInputFocus()
          }}
          onBlur={() => setPasswordFocused(false)}
        />

        {error && <p className='formError'>{error}</p>}

        {(formState.errors.nickName ||
          formState.errors.email ||
          formState.errors.password) && (
          <p className='formError'>Please fill in all required fields.</p>
        )}

        <button id='signInButton' type='submit' disabled={loading || success}>
          Sign Up
        </button>

        <div
          className={`passwordRequirements ${
            passwordFocused ? '' : 'hiddenRequirements'
          }`}
        >
          <ul>
            <li className={hasMinLength ? 'valid' : 'invalid'}>
              - Minimum 8 characters {hasMinLength ? '✔' : ''}
            </li>
            <li className={hasUpperAndLower ? 'valid' : 'invalid'}>
              - At least one uppercase letter and one lowercase{' '}
              {hasUpperAndLower ? '✔' : ''}
            </li>
            <li className={hasNumber ? 'valid' : 'invalid'}>
              - At least one number {hasNumber ? '✔' : ''}
            </li>
            <li className={hasSpecialChar ? 'valid' : 'invalid'}>
              - At least one special character {hasSpecialChar ? '✔' : ''}
            </li>
          </ul>
        </div>
        {loading ? (
          <span className='loadingSpanRegister'>
            <LoadingIcon size={25} borderSize={2} />
          </span>
        ) : success ? (
          <span className='succesSpanRegister'>Profile created!</span>
        ) : null}
      </form>
    </div>
  )
}

export default RegisterForm
