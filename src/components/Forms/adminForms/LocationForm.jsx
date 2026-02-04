import React, { useState } from 'react'
import './LocationForm.css'
import { useAuthContext } from '../../../context/AuthContext'
import { API } from '../../../utils/api/api'
import { useForm } from 'react-hook-form'
import Input from '../../UI/inputDOM/Input'
import Button from '../../UI/button/Button'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'

const LocationForm = ({ onLocationCreated }) => {
  const [error, setError] = useState('')
  const [hiddenForm, setHiddenForm] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { token } = useAuthContext()

  const { handleSubmit, register, formState, reset } = useForm({
    defaultValues: {
      country: ''
    }
  })

  const onSubmit = async (values) => {
    setError('')
    setSuccess(false)
    setLoading(true)

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
        setLoading(false)
        onLocationCreated() //Recibe la función desde el padre para que cada vez que creemos una localización se active la función y haga un fetch de las localizaciones en el padre (adminArea)
      } else {
        const errorMsg =
          result.data?.error ||
          result.data?.message ||
          JSON.stringify(result.data) ||
          'Error uploading new location'

        setError(errorMsg)
        setLoading(false)
      }
    } catch (err) {
      setError(err.message || 'Error creating location')
      setLoading(false)
    } finally {
      setLoading(false)
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
            required={true}
            errors={formState.errors}
            errorMessage={'Country is required!'}
          />
        </div>
        <div className='row_element_admin'>
          <Input
            id='locationImgInput'
            labelText='Choose an image for the location (jpg, png, jpeg, gif, webp)'
            type='file'
            className='locationImgForm'
            register={register}
            required={true}
            errors={formState.errors}
            errorMessage={'You have to choose an Image for the location!'}
            accept='image/*'
          />
        </div>
        <div id='endFormLocation'>
          <div id='loadingIconLocationDiv'>
            {loading ? (
              <LoadingIcon
                text={'Uploading new location..'}
                size={25}
                borderSize={2}
                classList='formLoading'
              />
            ) : null}
          </div>
          <div id='messagesLocationDiv'>
            {success && (
              <p className='successMessage'>Location created successfully!</p>
            )}
            {error && (
              <p className='errorMessage'>
                {error ===
                `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`
                  ? 'Only the specified image formats are allowed.'
                  : error}
              </p>
            )}
          </div>
          <div id='createLocationButtonDiv'>
            <Button
              type='submit'
              text='Create location'
              className='createLocationButton'
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default LocationForm
