import React, { useEffect, useState } from 'react'
import './ModifyEventForm.css'
import Input from '../../UI/inputDOM/Input'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../../context/AuthContext'
import { API } from '../../../utils/api/api'
import Button from '../../UI/button/Button'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'

const ModifyEventForm = ({ event }) => {
  const [error, setError] = useState('')
  const [hiddenForm, setHiddenForm] = useState(false)
  const [success, setSuccess] = useState(false)
  const [locationsAvailable, setLocationsAvailable] = useState([])
  const [loading, setLoading] = useState(false)
  const { token } = useAuthContext()

  const { handleSubmit, register, formState, reset } = useForm({
    defaultValues: {
      eventName: event?.eventName || '',
      date: event?.date || '',
      locationCountry: event?.locationCountry || '',
      locationCity: event?.locationCity || '',
      maxCapacity: event?.maxCapacity || '',
      description: event?.description || '',
      eventImg: null,
      eventBgImg: null
    }
  })

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
        method: 'POST', //cambiar esto
        isJSON: false,
        token: token
      })

      if (result.status === 200 || result.status === 201) {
        setSuccess(true)
        reset()
        setTimeout(() => setSuccess(false), 3000)
        setLoading(false)
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
    <div id='modifyInputDiv'>
      <h3 id='modifyH3'>Modify Event</h3>
      <form
        id='modifyForm'
        className={`modifyForm`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='row_element_admin'>
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

        <div className='row_element_admin'>
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

        <div className='row_element_admin'>
          <div style={{ width: '100%' }}>
            <label htmlFor='formDescription'>Description</label>
            <textarea
              {...register('description')}
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
        <div className='row_element_admin'>
          <div id='imgFormDiv'>
            <img id='imgEvent' src={event.eventImg} alt={event.eventName} />
          </div>
          <Input
            id='modifyImg'
            labelText='Choose an image for the event'
            type='file'
            accept='image/*'
            className='modifyImg'
            register={register}
            errors={formState.errors}
          />
        </div>
        <div className='row_element_admin'>
          <div id='imgFormDiv'>
            <img id='imgBgEvent' src={event.eventBgImg} alt={event.eventName} />
          </div>
          <Input
            id='modifyBgImg'
            labelText='Choose an image for the background'
            type='file'
            accept='image/*'
            className='modifyBgImg'
            register={register}
            errors={formState.errors}
            required={true}
          />
        </div>

        <div id='modifyButtonDiv'>
          <Button type='submit' text='Modify event' className='modifyButton' />
        </div>
        {loading ? (
          <LoadingIcon
            text={'Uploading new event..'}
            size={25}
            borderSize={2}
            classList='formLoading'
          />
        ) : null}
        {success && (
          <p className='successMessage'>Event modified successfully!</p>
        )}
        {error && <p className='errorMessage'>{error}</p>}
      </form>
    </div>
  )
}

export default ModifyEventForm
