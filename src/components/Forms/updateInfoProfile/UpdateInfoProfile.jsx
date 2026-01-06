import React, { useState } from 'react'
import './UpdateInfoProfile.css'
import { useForm } from 'react-hook-form'
import { API } from '../../../utils/api/api'
import { useAuthContext } from '../../../context/AuthContext'
import Input from '../../UI/inputDOM/Input'

const UpdateInfoProfile = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { user, token } = useAuthContext()

  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      name: user?.name || '',
      frstSurname: user?.frstSurname || '',
      scndSurname: user?.scndSurname || '',
      nickName: user?.nickName || '',
      location: user?.locationCity || '',
      email: user?.email || '',
      birthDate: user?.birthDate || '',
      gender: user?.gender || "Don't want to say"
    }
  })

  const onSubmit = async (values) => {
    setError('')
    setSuccess(false)

    const formData = new FormData()

    Object.keys(values).forEach((key) => {
      if (key === 'profileImgInput' && values[key]?.length > 0) {
        formData.append('profileImg', values[key][0])
      } else if (key !== 'profileImgInput' && values[key]) {
        formData.append(key, values[key])
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
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <form id='updateInfoForm' onSubmit={handleSubmit(onSubmit)}>
      <div id='accountHeader'>
        <h3>Personal information</h3>
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
              placeholder={user.locationCity}
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
      <div id='saveButtonDiv'>
        <button type='submit'>Save Changes</button>
      </div>

      {success && (
        <p className='success-message'>Changes saved successfully!</p>
      )}
      {error && <p className='error-message'>{error}</p>}
    </form>
  )
}

export default UpdateInfoProfile
