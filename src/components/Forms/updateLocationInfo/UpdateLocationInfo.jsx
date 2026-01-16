import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import { useForm } from 'react-hook-form'
import Input from '../../UI/inputDOM/Input'
import Button from '../../UI/button/Button'
import DeleteMessage from '../../UI/deleteMessage/DeleteMessage'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'
import './UpdateLocationInfo.css'
import { useNavigate } from 'react-router-dom'
import { API } from '../../../utils/api/api'

const UpdateLocationInfo = ({ location }) => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteButton, setDeleteButton] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(location)
  const { token } = useAuthContext()
  const navigate = useNavigate()

  const { handleSubmit, register, formState, setValue } = useForm({
    defaultValues: {
      country: location?.country || ''
    }
  })

  useEffect(() => {
    setCurrentLocation(location)

    setValue('country', location?.country || '')
  }, [location, setValue])

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
        endpoint: `/locations/${location._id}`,
        body: formData,
        method: 'PATCH',
        isJSON: false,
        token: token
      })

      if (result.status === 201 || result.status === 200) {
        setSuccess(true)
        setCurrentLocation(result.data)
        setValue('country', result.data.country)
        setTimeout(() => setSuccess(false), 3000)
        setLoading(false)
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

  const handleDeleteLocation = async () => {
    setError('')
    setLoading(true)
    setSuccess(false)

    try {
      const result = await API({
        endpoint: `/locations/${location._id}`,
        method: 'DELETE',
        token: token
      })

      if (result.status === 200) {
        setSuccess(true)
        setTimeout(() => {
          navigate(-1)
        }, 1000)
      } else {
        setError(result.data || 'Error deleting location')
      }
    } catch (error) {
      setError(error.message || 'Error deleting location')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id='modifyLocationDiv'>
      <div id='headerModifyLocation'>
        <h3 id='modifyLocationH3'>Modify Location</h3>
        <Button
          className={'backButtonModify'}
          type={'button'}
          text={'Go Back'}
          fnc={() => navigate(-1)}
        />
      </div>
      <form
        id='modifyLocationFormDiv'
        className={`modifyLocationFormDiv`}
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
          <div id='imgFormDiv'>
            <img
              id='imgLocation'
              src={currentLocation?.locationImg}
              alt={currentLocation?.country}
            />
          </div>
          <Input
            id='locationImgInput'
            labelText='Choose an image for the location (jpg, png, jpeg, gif, webp)'
            type='file'
            className='locationModifyImgForm'
            register={register}
            errors={formState.errors}
            accept='image/*'
          />
        </div>
        <div id='endFormModifyLocation'>
          <div id='loadingIconModifyLocationDiv'>
            {loading ? (
              <LoadingIcon
                text={'Uploading new location..'}
                size={25}
                borderSize={2}
                classList='formLoading'
              />
            ) : null}
          </div>
          <div id='messagesModifyLocationDiv'>
            {success && (
              <p className='successMessage'>Location modified successfully!</p>
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
          <div id='modifyLocationButtonFormDiv'>
            <Button
              type='submit'
              text='Modify location'
              className='modifyLocationButtonForm'
            />

            <Button
              type={'button'}
              text={'Delete Event'}
              className={'deleteLocationButton'}
              fnc={() => setDeleteButton(true)}
            />
            {deleteButton ? (
              <DeleteMessage
                elementToErase={'location'}
                yesFnc={() => handleDeleteLocation()}
                noFnc={() => setDeleteButton(false)}
              />
            ) : null}
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateLocationInfo
