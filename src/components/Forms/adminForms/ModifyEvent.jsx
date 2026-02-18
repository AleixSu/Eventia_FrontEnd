import './ModifyEvent.css'
import React, { useState } from 'react'
import { API } from '../../../utils/api/api'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../../UI/button/Button'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'
import { useAuthContext } from '../../../context/AuthContext'
import { useModifyEvent } from '../../../utils/api/queries/events/useModifyEvent'

const ModifyEvent = ({ eventsNames }) => {
  const { token } = useAuthContext()
  const [hiddenForm, setHiddenForm] = useState(false)

  const { handleSubmit, register, formState, reset } = useForm({
    defaultValues: {
      eventName: ''
    }
  })

  const modifyEventMutation = useModifyEvent(token)

  const onSubmit = (values) => {
    const body = { eventName: values.eventName }
    modifyEventMutation.mutate(body, {
      onSuccess: () => {
        reset()
      }
    })
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
            {modifyEventMutation.isPending && (
              <LoadingIcon
                text={'Getting Event info...'}
                size={25}
                borderSize={2}
                classList='formLoading'
              />
            )}
          </div>
          <div id='messagesModifyEventDiv'>
            {' '}
            {modifyEventMutation.isError && (
              <p className='errorMessage'>
                {modifyEventMutation.error.message}
              </p>
            )}
          </div>
          <div id='modifyEventButtonDiv'>
            <Button
              type='submit'
              text='Get Event'
              className='modifyEventButton'
              disabled={modifyEventMutation.isPending}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default ModifyEvent
