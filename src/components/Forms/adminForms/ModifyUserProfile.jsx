import React, { useState } from 'react'
import Input from '../../UI/inputDOM/Input'
import { useForm } from 'react-hook-form'
import './ModifyUserProfile.css'
import Button from '../../UI/button/Button'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'
import { useAuthContext } from '../../../context/AuthContext'
import { useModifyUserProfile } from '../../../utils/api/queries/users/useModifyUserProfile'

const ModifyUserProfile = () => {
  const [hiddenForm, setHiddenForm] = useState(false)
  const { token } = useAuthContext()

  const { handleSubmit, register, formState, reset } = useForm({
    defaultValues: {
      nickName: '',
      email: ''
    }
  })

  const modifyUserProfileMutation = useModifyUserProfile(token)

  const onSubmit = async (values) => {
    const body = { email: values.email, nickName: values.nickName }
    modifyUserProfileMutation.mutate(body, {
      onSuccess: () => {
        reset()
      }
    })
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
        <div id='endFormModifyUser'>
          <div id='loadingIconModifyUserDiv'>
            {' '}
            {modifyUserProfileMutation.isPending ?? (
              <LoadingIcon
                text={'Getting user info...'}
                size={25}
                borderSize={2}
                classList='formLoading'
              />
            )}
          </div>
          <div id='messagesModifyUserDiv'>
            {modifyUserProfileMutation.isError && (
              <p className='errorMessage'>
                {modifyUserProfileMutation.error.message}
              </p>
            )}
          </div>
          <div id='modifyUserButtonDiv'>
            <Button
              type='submit'
              text='Get user profile'
              className='modifyUserButton'
              disabled={modifyUserProfileMutation.isPending}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default ModifyUserProfile
