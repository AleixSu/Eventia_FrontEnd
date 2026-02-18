import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import { useForm } from 'react-hook-form'
import Input from '../../UI/inputDOM/Input'
import Button from '../../UI/button/Button'
import DeleteMessage from '../../UI/deleteMessage/DeleteMessage'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'
import './UpdateLocationInfo.css'
import { useNavigate } from 'react-router-dom'
import { useUpdateLocation } from '../../../utils/api/queries/locations/useUpdateLocation'
import { useDeleteLocation } from '../../../utils/api/queries/locations/useDeleteLocation'

const UpdateLocationInfo = ({ location }) => {
  const [success, setSuccess] = useState(false)
  const [deleteButton, setDeleteButton] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(location)
  const { token } = useAuthContext()
  const navigate = useNavigate()

  const { handleSubmit, register, formState, setValue } = useForm({
    defaultValues: {
      country: location?.country || ''
    }
  })

  const updateLocationMutation = useUpdateLocation(token)
  const deleteLocationMutation = useDeleteLocation(token)

  useEffect(() => {
    setCurrentLocation(location)

    setValue('country', location?.country || '')
  }, [location, setValue])

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

    updateLocationMutation.mutate(
      { formData, locationId: location._id },
      {
        onSuccess: (data) => {
          setSuccess(true)
          setCurrentLocation(data)
          setValue('country', data.country)
          setTimeout(() => setSuccess(false), 3000)
        }
      }
    )
  }

  const handleDeleteLocation = async () => {
    setSuccess(false)

    deleteLocationMutation.mutate(location._id, {
      onSuccess: (data) => {
        setSuccess(true)
        setTimeout(() => {
          navigate(-1)
        }, 1000)
      }
    })
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
            {(deleteLocationMutation.isPending ||
              updateLocationMutation.isPending) && (
              <LoadingIcon size={25} borderSize={2} />
            )}
          </div>
          <div id='messagesModifyLocationDiv'>
            {success && (
              <p className='successMessage'>Location modified successfully!</p>
            )}
            {(updateLocationMutation.isError ||
              deleteLocationMutation.isError) && (
              <p className='errorMessage'>
                {updateLocationMutation.error?.message ===
                  `Unexpected token '<', "<!DOCTYPE "... is not valid JSON` ||
                deleteLocationMutation.error?.message ===
                  `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`
                  ? 'Only the specified image formats are allowed.'
                  : updateLocationMutation.error?.message ||
                    deleteLocationMutation.error?.message}
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
