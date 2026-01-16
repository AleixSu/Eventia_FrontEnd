import React, { useState } from 'react'
import './UpdateInfoStyles.css'
import { useForm } from 'react-hook-form'
import { API } from '../../../utils/api/api'
import { useAuthContext } from '../../../context/AuthContext'
import Input from '../../UI/inputDOM/Input'
import Button from '../../UI/button/Button'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'
import { useNavigate } from 'react-router-dom'

const UpdateInfoUser = ({ user }) => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteButton, setDeleteButton] = useState(false)
  const { token } = useAuthContext()
  const navigate = useNavigate()

  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      name: user?.name || '',
      frstSurname: user?.frstSurname || '',
      scndSurname: user?.scndSurname || '',
      nickName: user?.nickName || '',
      location: user?.location || '',
      email: user?.email || '',
      birthDate: user?.birthDate
        ? new Date(user.birthDate).toISOString().split('T')[0]
        : '',
      password: '',
      newPassword: '',
      gender: user?.gender || "Don't want to say",
      role: user?.role || ''
    }
  })

  const onSubmit = async (values) => {
    setError('')
    setLoading(true)
    setSuccess(false)

    try {
      const formData = new FormData()

      if (values.newPassword || values.password) {
        if (values.newPassword !== values.password) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }
        if (values.password) {
          formData.append('password', values.password)
        }
      }

      Object.keys(values).forEach((key) => {
        if (key !== 'newPassword' && key !== 'password') {
          if (key === 'profileImgInput' && values[key]?.length > 0) {
            formData.append('profileImg', values[key][0])
          } else if (key !== 'profileImgInput' && values[key]) {
            formData.append(key, values[key])
          }
        }
      })

      const result = await API({
        endpoint: `/users/${user._id}`,
        body: formData,
        method: 'PATCH',
        isJSON: false,
        token: token
      })

      if (result.status === 200) {
        setSuccess(true)
        updateUser(result.data.user || result.data)
      } else {
        setError(result.data || 'Error updating profile')
      }
    } catch (error) {
      setError(error.message || 'Error updating profile')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setError('')
    setLoading(true)
    setSuccess(false)

    try {
      const result = await API({
        endpoint: `/users/${user._id}`,
        method: 'DELETE',
        token: token
      })

      if (result.status === 200) {
        setSuccess(true)
        navigate(-1)
      } else {
        setError(result.data || 'Error updating profile')
      }
    } catch (error) {
      setError(error.message || 'Error deleting profile')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <form id='updateInfoForm' onSubmit={handleSubmit(onSubmit)}>
      <div id='accountHeader'>
        <h3>Edit User Info</h3>
        <Button
          className={'backButton'}
          type={'button'}
          text={'Go Back'}
          fnc={() => navigate(-1)}
        />
      </div>
      <div id='accountMain'>
        <div id='accountInfo'>
          <div className='row_element'>
            <Input
              id={'name'}
              labelText={'Name'}
              className='formName'
              placeholder={user.name}
              register={register}
              errors={formState.errors}
            />
            <Input
              id={'frstSurname'}
              labelText={'First Surname'}
              className='formName'
              placeholder={user.frstSurname}
              register={register}
              errors={formState.errors}
            />
            <Input
              id={'scndSurname'}
              labelText={'Second Surname'}
              className='formName'
              placeholder={user.scndSurname}
              register={register}
              errors={formState.errors}
            />
          </div>
          <div className='row_element'>
            <Input
              id={'nickName'}
              labelText={'UserName'}
              className='formLocation'
              placeholder={user.nickName}
              register={register}
              errors={formState.errors}
            />
            <Input
              id={'location'}
              labelText={'Address'}
              className='formLocation'
              placeholder={user.location}
              register={register}
              errors={formState.errors}
            />
          </div>
          <div className='row_element'>
            <Input
              id={'email'}
              labelText={'E-Mail'}
              type='email'
              className='formEmail'
              placeholder={user.email}
              register={register}
              errors={formState.errors}
            />
          </div>
          <div className='row_element'>
            <Input
              id={'birthDate'}
              labelText={'Date of birth'}
              type='date'
              className='formBirth'
              placeholder={user.birthDate}
              register={register}
              errors={formState.errors}
            />
            <div className='formGender'>
              <label htmlFor='gender'>Gender</label>
              <select {...register('gender')} id='gender'>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value="Don't want to say">Don't want to say</option>
              </select>
            </div>
          </div>
          <div className='row_element'>
            {' '}
            <Input
              id={'newPassword'}
              labelText={'Change password'}
              className='formPassword'
              type='password'
              register={register}
              errors={formState.errors}
            />
            <Input
              id={'password'}
              labelText={'Write again your new password, please'}
              className='formPassword'
              type='password'
              register={register}
              errors={formState.errors}
            />
          </div>
          <div className='row_element'>
            {' '}
            <Input
              id={'role'}
              labelText={'Acces level'}
              className='formRole'
              register={register}
              errors={formState.errors}
            />{' '}
          </div>
        </div>
      </div>
      <div id='profileImgDiv'>
        <img
          src={user.profileImg || '/images/noProfileImgPage.png'}
          alt='profileIMG'
        />
        <Input
          id='profileImgInput'
          labelText='Change profile picture (jpg, png, jpeg, gif, webp)'
          type='file'
          accept='image/*'
          register={register}
          errors={formState.errors}
        />
      </div>

      <div id='endForm'>
        <div id='formMessagesDiv'>
          {success && (
            <p className='successMessageProfile'>Changes saved successfully!</p>
          )}
          {error && (
            <p className='errorMessageProfile'>
              {error ===
              `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`
                ? 'Only the specified image formats are allowed.'
                : error}
            </p>
          )}
        </div>
        <div id='loadingIconDiv'>
          {loading ? <LoadingIcon size={25} borderSize={2} /> : null}
        </div>
        <div id='saveButtonDiv'>
          <Button
            type={'submit'}
            text={'Save Changes'}
            className={'saveChangesButton'}
          />
          <Button
            type={'button'}
            text={'Delete Account'}
            className={'deleteAccountButton'}
            fnc={() => setDeleteButton(true)}
          />
          {deleteButton ? (
            <DeleteMessage
              elementToErase={'profile'}
              yesFnc={() => handleDeleteAccount()}
              noFnc={() => setDeleteButton(false)}
            />
          ) : null}
        </div>
      </div>
    </form>
  )
}

export default UpdateInfoUser
