import './ModifyEvent.css'
import React, { useState } from 'react'
import { API } from '../../../utils/api/api'
import Input from '../../UI/inputDOM/Input'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../../UI/button/Button'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'
import { useAuthContext } from '../../../context/AuthContext'

const ModifyEvent = ({ eventsNames }) => {
  const [error, setError] = useState('')
  const [hiddenForm, setHiddenForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const { token } = useAuthContext()
  const navigate = useNavigate()

  const { handleSubmit, register, formState, reset } = useForm({
    defaultValues: {
      eventName: ''
    }
  })

  const onSubmit = async (values) => {
    setError('')
    setLoading(true)

    const body = { eventName: values.eventName }

    try {
      const result = await API({
        endpoint: `/events/getEventByName`,
        body: body,
        method: 'POST',
        token: token
      })
      console.log(values.eventName)

      if (result.status === 201 || result.status === 200) {
        reset()
        setTimeout(() => {
          navigate(`/admin_area/edit_event/${result.data._id}`, {
            state: { event: result.data }
          })
        }, 500)
      } else {
        const errorMsg =
          result.data?.error ||
          result.data?.message ||
          JSON.stringify(result.data) ||
          'Error fetching the event'

        setError(errorMsg)
        setLoading(false)
      }
    } catch (error) {
      setError(error.message || 'Error fetching the event')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id='modifyEventInputDiv'>
      <h3 id='modifyEventh3' onClick={() => setHiddenForm(!hiddenForm)}>
        Modify Event Info
      </h3>
      <form
        id='modifyEventForm'
        className={`modifyEventForm ${hiddenForm ? 'hiddenForm' : ''}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='row_element_admin'>
          <div className='formModifyEventWrapper'>
            <label htmlFor='eventName'>Event</label>
            <select
              id='eventName'
              className={
                formState.errors.eventName
                  ? 'redInput formCountryLocation'
                  : 'formCountryLocation'
              }
              {...register('eventName', {
                required: 'You have to select an event!'
              })}
            >
              <option value=''>Select an Event</option>
              {eventsNames.map((eventName) => (
                <option key={eventName._id} value={eventName.eventName}>
                  {eventName.eventName}
                </option>
              ))}
            </select>
            {formState.errors.eventName && (
              <span className='errorMessage'>
                {formState.errors.eventName.message}
              </span>
            )}
          </div>
        </div>
        <div id='endFormModifyEvent'>
          {' '}
          <div id='loadingIconModifyEventDiv'>
            {' '}
            {loading ? (
              <LoadingIcon
                text={'Getting Event info...'}
                size={25}
                borderSize={2}
                classList='formLoading'
              />
            ) : null}
          </div>
          <div id='messagesModifyEventDiv'>
            {' '}
            {error && <p className='errorMessage'>{error}</p>}
          </div>
          <div id='modifyEventButtonDiv'>
            <Button
              type='submit'
              text='Get Event'
              className='modifyEventButton'
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default ModifyEvent
