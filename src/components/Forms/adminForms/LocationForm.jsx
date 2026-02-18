import React, { useState } from 'react'
import './LocationForm.css'
import { useAuthContext } from '../../../context/AuthContext'
import { useForm } from 'react-hook-form'
import Input from '../../UI/inputDOM/Input'
import Button from '../../UI/button/Button'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'
import { useCreateLocation } from '../../../utils/api/queries/locations/useCreateLocation'

const LocationForm = () => {
  const [hiddenForm, setHiddenForm] = useState(false)
  const [success, setSuccess] = useState(false)
  const { token } = useAuthContext()

  const { handleSubmit, register, formState, reset } = useForm({
    defaultValues: {
      country: ''
    }
  })

  const createLocationMutation = useCreateLocation(token)

  const onSubmit = async (values) => {
    setSuccess(false)

    const formData = new FormData()

    Object.keys(values).forEach((key) => {
      if (key === 'locationImgInput' && values[key]?.length > 0) {
        formData.append('locationImg', values[key][0])
      } else if (key !== 'locationImgInput' && values[key]) {
        formData.append(key, values[key])
      }
    })

    createLocationMutation.mutate(formData, {
      onSuccess: () => {
        setSuccess(true)
        reset()
        setTimeout(() => setSuccess(false), 3000)
      }
    })
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
            {createLocationMutation.isPending && (
              <LoadingIcon
                text={'Uploading new location..'}
                size={25}
                borderSize={2}
                classList='formLoading'
              />
            )}
          </div>
          <div id='messagesLocationDiv'>
            {success && (
              <p className='successMessage'>Location created successfully!</p>
            )}
            {createLocationMutation.isError && (
              <p className='errorMessage'>
                {createLocationMutation.error.message ===
                `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`
                  ? 'Only the specified image formats are allowed.'
                  : createLocationMutation.error.message}
              </p>
            )}
          </div>
          <div id='createLocationButtonDiv'>
            <Button
              type='submit'
              text='Create location'
              className='createLocationButton'
              disabled={createLocationMutation.isPending}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default LocationForm
