import './ModifyLocation.css'
import React, { useState } from 'react'
import { API } from '../../../utils/api/api'
import Input from '../../UI/inputDOM/Input'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../../UI/button/Button'
import LoadingIcon from '../../UI/loadingIcon/LoadingIcon'
import { useAuthContext } from '../../../context/AuthContext'

const ModifyLocation = ({ locationsAvailable }) => {
  const [error, setError] = useState('')
  const [hiddenForm, setHiddenForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const { token } = useAuthContext()
  const navigate = useNavigate()

  const { handleSubmit, register, formState, reset } = useForm({
    defaultValues: {
      country: ''
    }
  })

  const onSubmit = async (values) => {
    setError('')
    setLoading(true)
    console.log(values.locationCountry)

    const body = { country: values.locationCountry }

    try {
      const result = await API({
        endpoint: `/locations/getLocationByName`,
        body: body,
        method: 'POST',
        token: token
      })
      if (result.status === 201 || result.status === 200) {
        reset()
        setTimeout(() => {
          navigate(`/admin_area/edit_location/${result.data._id}`, {
            state: { locationData: result.data }
          })
        }, 500)
      } else {
        const errorMsg =
          result.data?.error ||
          result.data?.message ||
          JSON.stringify(result.data) ||
          'Error fetching the location'

        setError(errorMsg)
        setLoading(false)
      }
    } catch (error) {
      setError(error.message || 'Error fetching the location')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id='modifyLocationInputDiv'>
      <h3 id='modifyLocationh3' onClick={() => setHiddenForm(!hiddenForm)}>
        Modify Location Info
      </h3>
      <form
        id='modifyLocationForm'
        className={`modifyLocationForm ${hiddenForm ? 'hiddenForm' : ''}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='row_element_admin'>
          <div className='formModifyCountryWrapper'>
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
                <option key={location._id} value={location.country}>
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
        </div>
        <div id='endFormModifyLocation'>
          {' '}
          <div id='loadingIconModifyLocationDiv'>
            {' '}
            {loading ? (
              <LoadingIcon
                text={'Getting Location info...'}
                size={25}
                borderSize={2}
                classList='formLoading'
              />
            ) : null}
          </div>
          <div id='messagesModifyLocationDiv'>
            {' '}
            {error && <p className='errorMessage'>{error}</p>}
          </div>
          <div id='modifyLocationButtonDiv'>
            <Button
              type='submit'
              text='Get Location'
              className='modifyLocationButton'
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default ModifyLocation
