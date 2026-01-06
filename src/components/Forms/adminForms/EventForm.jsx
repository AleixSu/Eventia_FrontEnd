import React, { useEffect, useState } from 'react'
import './EventForm.css'
import Input from '../../UI/inputDOM/Input'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../../context/AuthContext'
import { API } from '../../../utils/api/api'
import Button from '../../UI/button/Button'

const EventForm = () => {
  const [error, setError] = useState('')
  const [hiddenForm, setHiddenForm] = useState(false)
  const [success, setSuccess] = useState(false)
  const [locationsAvailable, setLocationsAvailable] = useState([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuthContext()

  const { handleSubmit, register, formState, reset } = useForm({
    defaultValues: {
      eventName: '',
      date: '',
      locationCountry: '',
      locationCity: '',
      maxCapacity: '',
      description: '',
      eventImg: null,
      eventBgImg: null
    }
  })

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true)
        const response = await API({
          endpoint: '/locations/countries'
        })

        if (response.status === 200) {
          setLocationsAvailable(response.data)
        }
      } catch (err) {
        console.error('Error fetching locations:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLocations()
  }, [])

  const onSubmit = async (values) => {
    setError('')
    setSuccess(false)

    const formData = new FormData()

    formData.append('eventName', values.eventName)
    formData.append('date', values.date)
    formData.append('locationCountry', values.locationCountry)
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
        endpoint: '/events',
        body: formData,
        method: 'POST',
        isJSON: false,
        token: token
      })

      if (result.status === 200 || result.status === 201) {
        setSuccess(true)
        reset()
        setTimeout(() => setSuccess(false), 3000)
      } else {
        const errorMsg =
          result.data?.error ||
          result.data?.message ||
          'Error uploading new event'
        setError(errorMsg)
      }
    } catch (err) {
      setError(err.message || 'Error creating event')
      console.error(err)
    }
  }

  return (
    <div id='eventInputDiv'>
      <h3 id='createEventH3' onClick={() => setHiddenForm(!hiddenForm)}>
        Create New Event
      </h3>

      {loading ? (
        <p>Loading locations...</p>
      ) : (
        <form
          id='createEventForm'
          className={`createEventForm ${hiddenForm ? 'hiddenForm' : ''}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='row_element_admin'>
            <Input
              id='eventName'
              labelText='Event Name'
              className='formEventName'
              register={register}
              errors={formState.errors}
              required={true}
              errorMessage={'Event Name is required!'}
            />
            <Input
              id='date'
              labelText='Event Date'
              type='date'
              className='formDate'
              register={register}
              errors={formState.errors}
              required={true}
              errorMessage={'Event Date is required!'}
            />
          </div>

          <div className='row_element_admin'>
            <div className='formCountryWrapper'>
              <label htmlFor='locationCountry'>Country</label>
              <select
                id='locationCountry'
                className={
                  formState.errors.locationCountry
                    ? 'redInput formCountryLocation'
                    : 'formCountryLocation'
                }
                {...register('locationCountry', {
                  required: 'You have to select a country!'
                })}
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
              required={true}
              errorMessage={'City is required!'}
            />
            <Input
              id='maxCapacity'
              labelText='Capacity'
              type='number'
              className='formCapacity'
              register={register}
              errors={formState.errors}
              required={true}
              errorMessage={'Capacity is required!'}
            />
          </div>

          <div className='row_element_admin'>
            <Input
              id='eventImg'
              labelText='Choose an image for the event'
              type='file'
              accept='image/*'
              className='eventImg'
              register={register}
              errors={formState.errors}
              required={true}
              errorMessage={'An image of the event is required!'}
            />
            <Input
              id='eventBgImg'
              labelText='Choose an image for the background'
              type='file'
              accept='image/*'
              className='eventBgImg'
              register={register}
              errors={formState.errors}
              required={true}
              errorMessage={
                'An image for the background of the event is required!'
              }
            />
          </div>

          <div className='row_element_admin'>
            <div style={{ width: '100%' }}>
              <label htmlFor='formDescription'>Description</label>
              <textarea
                {...register('description', {
                  required: 'Description is required!'
                })}
                id='formDescription'
                className={formState.errors.description ? 'redInput' : null}
                placeholder='Write a description for the event...'
                rows={8}
                e
                style={{ width: '100%' }}
              ></textarea>
              {formState.errors.description && (
                <span className='errorMessage'>
                  {formState.errors.description.message}
                </span>
              )}
            </div>
          </div>

          {error && <p className='formError'>{error}</p>}
          {success && (
            <p className='formSuccess'>Event created successfully!</p>
          )}

          <div id='createEventButtonDiv'>
            <Button
              type='submit'
              text='Create event'
              className='createEventButton'
            />
          </div>
        </form>
      )}
    </div>
  )
}

export default EventForm
