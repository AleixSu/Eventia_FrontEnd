import React, { useEffect, useState } from 'react'
import './UpdateInfoEvent.css'
import Input from '../../UI/inputDOM/Input'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../../context/AuthContext'
import { API } from '../../../utils/api/api'
import Button from '../../UI/button/Button'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'
import { useNavigate } from 'react-router-dom'

const UpdateInfoEvent = ({ event }) => {
  const [error, setError] = useState('d')
  const [success, setSuccess] = useState(false)
  const [locationsAvailable, setLocationsAvailable] = useState([])
  const [deleteButton, setDeleteButton] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentEvent, setCurrentEvent] = useState(event)
  const { token } = useAuthContext()
  const navigate = useNavigate()

  const { handleSubmit, register, formState, reset, setValue } = useForm({
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

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await API({
          endpoint: '/locations/countries'
        })

        if (response.status === 200) {
          setLocationsAvailable(response.data)
        }
      } catch (err) {
        console.error('Error fetching locations:', err)
      }
    }

    fetchLocations()
  }, [])

  const onSubmit = async (values) => {
    setError('')
    setSuccess(false)
    setLoading(true)

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

    try {
      const result = await API({
        endpoint: `/events/${event._id}`,
        body: formData,
        method: 'PATCH',
        isJSON: false,
        token: token
      })

      if (result.status === 200 || result.status === 201) {
        setSuccess(true)
        setCurrentEvent(result.data)
        setValue('eventName', result.data.eventName)
        setValue(
          'date',
          result.data.date
            ? new Date(result.data.date).toISOString().split('T')[0]
            : ''
        )
        setValue('locationCountry', result.data.locationCountry?._id || '')
        setValue('locationCity', result.data.locationCity)
        setValue('maxCapacity', result.data.maxCapacity)
        setValue('description', result.data.description)

        setTimeout(() => setSuccess(false), 3000)
      } else {
        const errorMsg =
          result.data?.error ||
          result.data?.message ||
          result.data ||
          'Error updating event'
        setError(errorMsg)
      }
    } catch (err) {
      setError(err.message || 'Error updating event')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEvent = async () => {
    setError('')
    setLoading(true)
    setSuccess(false)

    try {
      const result = await API({
        endpoint: `/events/${event._id}`,
        method: 'DELETE',
        token: token
      })

      if (result.status === 200) {
        setSuccess(true)
        setTimeout(() => {
          navigate(-1)
        }, 1000)
      } else {
        setError(result.data || 'Error deleting event')
      }
    } catch (error) {
      setError(error.message || 'Error deleting event')
    } finally {
      setLoading(false)
    }
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
            {error && (
              <p className='errorMessage'>
                {error ===
                `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`
                  ? 'Only the specified image formats are allowed.'
                  : error}
              </p>
            )}
          </div>
          <div id='loadingIconDivEvent'>
            {loading ? (
              <LoadingIcon
                text={deleteButton ? 'Deleting event' : 'Uploading new event..'}
                size={25}
                borderSize={2}
                classList='formLoading'
              />
            ) : null}
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
