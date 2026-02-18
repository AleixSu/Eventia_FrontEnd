import React, { useEffect, useState } from 'react'
import './UpdateInfoEvent.css'
import Input from '../../UI/inputDOM/Input'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../../context/AuthContext'
import Button from '../../UI/button/Button'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'
import { useNavigate } from 'react-router-dom'
import DeleteMessage from '../../UI/deleteMessage/DeleteMessage'
import { useGetCountries } from '../../../utils/api/queries/locations/useGetCountries'
import { useUpdateEvent } from '../../../utils/api/queries/events/useUpdateEvent'
import { useDeleteEvent } from '../../../utils/api/queries/events/useDeleteEvent'

const UpdateInfoEvent = ({ event }) => {
  const [success, setSuccess] = useState(false)
  const [deleteButton, setDeleteButton] = useState(false)
  const [currentEvent, setCurrentEvent] = useState(event)
  const { token } = useAuthContext()
  const navigate = useNavigate()
  const { handleSubmit, register, formState, setValue } = useForm({
    defaultValues: {
      eventName: event?.eventName || '',
      date: event?.date ? new Date(event.date).toISOString().split('T')[0] : '',
      locationCountry: event?.locationCountry?._id || '',
      locationCity: event?.locationCity || '',
      maxCapacity: event?.maxCapacity || '',
      description: event?.description || '',
      eventImg: null,
      eventBgImg: null
    }
  })

  useEffect(() => {
    setCurrentEvent(event)
    setValue('eventName', event?.eventName || '')
    setValue(
      'date',
      event?.date ? new Date(event.date).toISOString().split('T')[0] : ''
    )
    setValue('locationCountry', event?.locationCountry?._id || '')
    setValue('locationCity', event?.locationCity || '')
    setValue('maxCapacity', event?.maxCapacity || '')
    setValue('description', event?.description || '')
  }, [event, setValue])

  const { data: locationsAvailable = [] } = useGetCountries()

  const updateEventMutation = useUpdateEvent(token)
  const deleteEventMutation = useDeleteEvent(token)

  const onSubmit = (values) => {
    setSuccess(false)

    const locationCountryValue =
      values.locationCountry || event.locationCountry?._id

    const formData = new FormData()

    formData.append('eventName', values.eventName)
    formData.append('date', values.date)
    formData.append('locationCountry', locationCountryValue)
    formData.append('locationCity', values.locationCity)
    formData.append('maxCapacity', values.maxCapacity)
    formData.append('description', values.description)

    if (values.eventImg && values.eventImg.length > 0) {
      formData.append('eventImg', values.eventImg[0])
    }

    if (values.eventBgImg && values.eventBgImg.length > 0) {
      formData.append('eventBgImg', values.eventBgImg[0])
    }

    updateEventMutation.mutate(
      { formData, eventId: event._id },
      {
        onSuccess: (data) => {
          setSuccess(true)
          setCurrentEvent(data)
          setValue('eventName', data.eventName)
          setValue(
            'date',
            data.date ? new Date(data.date).toISOString().split('T')[0] : ''
          )
          setValue('locationCountry', data.locationCountry?._id || '')
          setValue('locationCity', data.locationCity)
          setValue('maxCapacity', data.maxCapacity)
          setValue('description', data.description)
          setTimeout(() => setSuccess(false), 3000)
        }
      }
    )
  }

  const handleDeleteEvent = async () => {
    setSuccess(false)

    deleteEventMutation.mutate(event._id, {
      onSuccess: (data) => {
        setSuccess(true)
        navigate(-1)
      }
    })
  }

  return (
    <div id='modifyInputDiv'>
      <div id='headerModifyEvent'>
        <h3 id='modifyH3'>Modify Event</h3>
        <Button
          className={'backButtonModify'}
          type={'button'}
          text={'Go Back'}
          fnc={() => navigate(-1)}
        />
      </div>
      <form
        id='modifyForm'
        className={`modifyForm`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='row_element_modify_event'>
          <Input
            id='eventName'
            labelText='Event Name'
            className='formEventName'
            register={register}
            errors={formState.errors}
          />
          <Input
            id='date'
            labelText='Event Date'
            type='date'
            className='formDate'
            register={register}
            errors={formState.errors}
          />
        </div>

        <div className='row_element_modify_event'>
          <div className='formCountryWrapper'>
            <label htmlFor='locationCountry'>Country</label>
            <select
              id='locationCountry'
              className={'formCountryLocation'}
              {...register('locationCountry')}
            >
              <option value=''>Select a country</option>
              {locationsAvailable.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.country}
                </option>
              ))}
            </select>
            {formState.errors.locationCountry && (
              <span className='errorMessage'>
                {formState.errors.locationCountry.message}
              </span>
            )}
          </div>

          <Input
            id='locationCity'
            labelText='City'
            className='formCityLocation'
            register={register}
            errors={formState.errors}
          />
          <Input
            id='maxCapacity'
            labelText='Capacity'
            type='number'
            className='formCapacity'
            register={register}
            errors={formState.errors}
          />
        </div>

        <div className='row_element_modify_event'>
          <div style={{ width: '100%' }}>
            <label htmlFor='formDescription'>Description</label>
            <textarea
              {...register('description')}
              id='formDescription'
              className={formState.errors.description ? 'redInput' : null}
              placeholder='Write a description for the event...'
              rows={8}
              style={{ width: '100%' }}
            ></textarea>
            {formState.errors.description && (
              <span className='errorMessage'>
                {formState.errors.description.message}
              </span>
            )}
          </div>
        </div>
        <div className='row_element_modify_event'>
          <div id='imgFormDiv'>
            <img
              id='imgEvent'
              src={currentEvent?.eventImg}
              alt={currentEvent?.eventName}
            />
          </div>
          <Input
            id='eventImg'
            labelText='Choose an image for the event (jpg, png, jpeg, gif, webp)'
            type='file'
            accept='image/*'
            className='modifyImgDiv'
            register={register}
            errors={formState.errors}
          />
        </div>
        <div className='row_element_modify_event'>
          <div id='imgFormDiv'>
            <img
              id='imgBgEvent'
              src={currentEvent?.eventBgImg}
              alt={currentEvent?.eventName}
            />
          </div>
          <Input
            id='eventBgImg'
            labelText='Choose an image for the background (jpg, png, jpeg, gif, webp)'
            type='file'
            accept='image/*'
            className='modifyBgImgDiv'
            register={register}
            errors={formState.errors}
          />
        </div>
        <div id='endFormEvent'>
          <div id='formMessagesDivEvent'>
            {success && (
              <p className='successMessage'>
                {deleteButton
                  ? 'Event deleted successfully!'
                  : 'Event modified successfully!'}
              </p>
            )}
            {(updateEventMutation.isError || deleteEventMutation.isError) && (
              <p className='errorMessage'>
                {updateEventMutation.error?.message ===
                  `Unexpected token '<', "<!DOCTYPE "... is not valid JSON` ||
                deleteEventMutation.error?.message ===
                  `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`
                  ? 'Only the specified image formats are allowed.'
                  : updateEventMutation.error?.message ||
                    deleteEventMutation.error?.message}
              </p>
            )}
          </div>
          <div id='loadingIconDivEvent'>
            {(deleteEventMutation.isPending ||
              updateEventMutation.isPending) && (
              <LoadingIcon
                text={deleteButton ? 'Deleting event' : 'Uploading new event..'}
                size={25}
                borderSize={2}
                classList='formLoading'
              />
            )}
          </div>
          <div id='modifyButtonDiv'>
            <Button
              type='submit'
              text='Modify event'
              className='modifyButton'
            />
            <Button
              type={'button'}
              text={'Delete Event'}
              className={'deleteEventButton'}
              fnc={() => setDeleteButton(true)}
            />
            {deleteButton ? (
              <DeleteMessage
                elementToErase={'event'}
                yesFnc={() => handleDeleteEvent()}
                noFnc={() => setDeleteButton(false)}
              />
            ) : null}
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateInfoEvent
