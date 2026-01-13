import React, { useState } from 'react'
import { API } from '../../../utils/api/api'
import Input from '../../UI/inputDOM/Input'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './ModifyUserProfile.css'
import Button from '../../UI/button/Button'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'
import { useAuthContext } from '../../../context/AuthContext'

const ModifyUserProfile = () => {
  const [error, setError] = useState('')
  const [hiddenForm, setHiddenForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const { token } = useAuthContext()
  const navigate = useNavigate()

  const { handleSubmit, register, formState, reset } = useForm({
    defaultValues: {
      nickName: '',
      email: ''
    }
  })

  const onSubmit = async (values) => {
    setError('')
    setLoading(true)

    const body = { email: values.email, nickName: values.nickName }

    try {
      const result = await API({
        endpoint: `/users/getUserByEmail`,
        body: body,
        method: 'POST',
        token: token
      })
      if (result.status === 201 || result.status === 200) {
        reset()
        setTimeout(() => {
          navigate(`/admin_area/edit_user/${result.data._id}`, {
            state: { user: result.data }
          })
        }, 500)
      } else {
        const errorMsg =
          result.data?.error ||
          result.data?.message ||
          JSON.stringify(result.data) ||
          'Error fetching the user'

        setError(errorMsg)
        setLoading(false)
      }
    } catch (error) {
      setError(error.message || 'Error fetching the user')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id='modifyUserInputDiv'>
      <h3 id='modifyUserh3' onClick={() => setHiddenForm(!hiddenForm)}>
        Modify User Profile
      </h3>
      <form
        id='modifyUserForm'
        className={`modifyUserForm ${hiddenForm ? 'hiddenForm' : ''}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='row_element_admin'>
          <Input
            id='nickName'
            labelText='User Name'
            className='formNickNameModify'
            register={register}
            required={true}
            errors={formState.errors}
            errorMessage={'User Name is required!'}
          />
          <Input
            id='email'
            labelText={'Email'}
            className='formEmailModify'
            register={register}
            required={true}
            errors={formState.errors}
            errorMessage={'Email is Required'}
          />
        </div>
        <div id='modifyUserButtonDiv'>
          <Button
            type='submit'
            text='Get user profile'
            className='modifyUserButton'
          />
        </div>
        {loading ? (
          <LoadingIcon
            text={'Getting user info...'}
            size={25}
            borderSize={2}
            classList='formLoading'
          />
        ) : null}
        {error && <p className='errorMessage'>{error}</p>}
      </form>
    </div>
  )
}

export default ModifyUserProfile
