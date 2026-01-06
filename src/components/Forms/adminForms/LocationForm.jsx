import React, { useState } from 'react'
import './LocationForm.css'
import { useAuthContext } from '../../../context/AuthContext'
import { API } from '../../../utils/api/api'
import { useForm } from 'react-hook-form'
import Input from '../../UI/inputDOM/Input'
import Button from '../../UI/button/Button'

const LocationForm = () => {
  const [error, setError] = useState('')
  const [hiddenForm, setHiddenForm] = useState(false)
  const [success, setSuccess] = useState(false)
  const { token } = useAuthContext()

  const { handleSubmit, register, formState, reset } = useForm({
    defaultValues: {
      country: ''
    }
  })

  const onSubmit = async (values) => {
    setError('')
    setSuccess(false)
    const formData = new FormData()

    Object.keys(values).forEach((key) => {
      if (key === 'locationImgInput' && values[key]?.length > 0) {
        formData.append('locationImg', values[key][0])
      } else if (key !== 'locationImgInput' && values[key]) {
        formData.append(key, values[key])
      }
    })

    try {
      const result = await API({
        endpoint: '/locations/',
        body: formData,
        method: 'POST',
        isJSON: false,
        token: token
      })

      if (result.status === 201 || result.status === 200) {
        setSuccess(true)
        reset()
        setTimeout(() => setSuccess(false), 3000)
      } else {
        const errorMsg =
          result.data?.error ||
          result.data?.message ||
          JSON.stringify(result.data) ||
          'Error uploading new location'

        setError(errorMsg)
      }
    } catch (err) {
      setError(err.message || 'Error creating location')
      console.error(err)
    }
  }

  return (
    <div id='locationInputDiv'>
      <h3 id='createLocationH3' onClick={() => setHiddenForm(!hiddenForm)}>
        Create New Location
      </h3>
      <form
        id='createLocationForm'
        className={`createLocationForm ${hiddenForm ? 'hiddenForm' : ''}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='row_element_admin'>
          <Input
            id='country'
            labelText='Country'
            className='formCountry'
            register={register}
            errors={formState.errors}
            validation={{ required: 'Country is required' }}
          />
        </div>
        <div className='row_element_admin'>
          <Input
            id='locationImgInput'
            labelText='Choose an image for the location'
            type='file'
            className='locationImgForm'
            register={register}
            errors={formState.errors}
            accept='image/*'
          />
        </div>
        <div id='createLocationButtonDiv'>
          <Button
            type='submit'
            text='Create location'
            className='createLocationButton'
          />
        </div>
        {success && (
          <p className='success-message'>Location created successfully!</p>
        )}
        {error && <p className='error-message'>{error}</p>}
      </form>
    </div>
  )
}

export default LocationForm
