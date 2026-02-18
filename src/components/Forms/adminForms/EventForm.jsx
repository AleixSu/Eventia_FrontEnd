import React, { useState } from 'react'
import './EventForm.css'
import Input from '../../UI/inputDOM/Input'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../../context/AuthContext'
import Button from '../../UI/button/Button'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'
import { useCreateEvent } from '../../../utils/api/queries/events/useCreateEvent'

const EventForm = ({ locationsAvailable }) => {
  const [hiddenForm, setHiddenForm] = useState(false)
  const [success, setSuccess] = useState(false)
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

  const createEventMutation = useCreateEvent(token) //Declaramos nuestra función

  const onSubmit = async (values) => {
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

    createEventMutation.mutate(formData, {
      onSuccess: () => {
        setSuccess(true)
        reset()
        setTimeout(() => setSuccess(false), 3000)
      }
    }) //Le decimos a nuestra función de createEvent que se ejecute mediante ".mutate". Esto es lo que marca la diferencia del useQuery. useQuery se ejecuta automáticamente, useMutation solo cuando nosotros queramos mediante .mutate.
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
          <div id='loadingIconEventDiv'>
            {createEventMutation.isPending && (
              <LoadingIcon
                text={'Uploading new event..'}
                size={25}
                borderSize={2}
                classList='formLoading'
              />
            )}
          </div>
          <div id='messagesEventDiv'>
            {success && (
              <p className='successMessage'>Event created successfully!</p>
            )}
            {createEventMutation.isError && (
              <p className='errorMessage'>
                {createEventMutation.error.message ===
                `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`
                  ? 'Only the specified image formats are allowed.'
                  : createEventMutation.error.message}
              </p>
            )}
          </div>
          <div id='createEventButtonDiv'>
            <Button
              type='submit'
              text='Create event'
              className='createEventButton'
              disabled={createEventMutation.isPending}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default EventForm
