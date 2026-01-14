import React, { useState } from 'react'
import './UpdateInfoStyles.css'
import { useForm } from 'react-hook-form'
import { API } from '../../../utils/api/api'
import { useAuthContext } from '../../../context/AuthContext'
import Input from '../../UI/inputDOM/Input'
import Button from '../../UI/button/Button'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'
import { useNavigate } from 'react-router-dom'

const UpdateInfoProfile = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteButton, setDeleteButton] = useState(false)
  const { user, token, logOut } = useAuthContext()
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
      gender: user?.gender || "Don't want to say"
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
      } else {
        setError(result.data || 'Error updating profile')
      }
    } catch (error) {
      setError(result.data || 'Error updating profile')
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
        logOut()
        navigate('/')
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
        <h3>Personal information</h3>
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
        </div>
      </div>
      <div id='profileImgDiv'>
        <img
          src={user.profileImg || '/images/noProfileImgPage.png'}
          alt='profileIMG'
        />
        <Input
          id='profileImgInput'
          labelText='Change profile picture'
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
          {error && <p className='errorMessageProfile'>{error}</p>}
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
            <div className='deleteConfirmation'>
              <h3>¿Are you sure you want to delete this account?</h3>
              <div>
                <Button
                  type={'button'}
                  fnc={() => handleDeleteAccount()}
                  text={'Yes'}
                />{' '}
                <Button
                  type={'button'}
                  fnc={() => setDeleteButton(false)}
                  text={'No'}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </form>
  )
}
export default UpdateInfoProfile
