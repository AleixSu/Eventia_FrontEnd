import React, { useEffect, useState } from 'react'
import './EventForm.css'
import Input from '../../UI/inputDOM/Input'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../../context/AuthContext'
import { API } from '../../../utils/api/api'
import Button from '../../UI/button/Button'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'

const EventForm = ({ locationsAvailable, onEventCreated }) => {
  const [error, setError] = useState('')
  const [hiddenForm, setHiddenForm] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
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

  const onSubmit = async (values) => {
    setError('')
    setSuccess(false)
    setLoading(true)

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
        setLoading(false)
        onEventCreated()
      } else {
        const errorMsg =
          result.data?.error ||
          result.data?.message ||
          result.data ||
          'Error uploading new event'
        setError(errorMsg)
        setLoading(false)
      }
    } catch (err) {
      setError(err.message || 'Error creating event')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id='eventInputDiv'>
      <h3 id='createEventH3' onClick={() => setHiddenForm(!hiddenForm)}>
        Create New Event
      </h3>
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
            labelText='Choose an image for the event (jpg, png, jpeg, gif, webp)'
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
            labelText='Choose an image for the background (jpg, png, jpeg, gif, webp)'
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
        <div id='endFormCreateEvent'>
          {' '}
          <div id='loadingIconEventDiv'>
            {' '}
            {loading ? (
              <LoadingIcon
                text={'Uploading new event..'}
                size={25}
                borderSize={2}
                classList='formLoading'
              />
            ) : null}
          </div>
          <div id='messagesEventDiv'>
            {success && (
              <p className='successMessage'>Event created successfully!</p>
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
          <div id='createEventButtonDiv'>
            <Button
              type='submit'
              text='Create event'
              className='createEventButton'
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default EventForm
