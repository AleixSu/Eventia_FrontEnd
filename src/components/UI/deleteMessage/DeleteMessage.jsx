import React from 'react'
import './DeleteMessage.css'
import Button from '../button/Button'

const DeleteMessage = ({ elementToErase, yesFnc, noFnc }) => {
  return (
    <div className='deleteConfirmation'>
      <h3>¿Are you sure you want to delete this {elementToErase}?</h3>
      <div id='deleteConfirmationButtonDiv'>
        <Button type={'button'} fnc={yesFnc} text={'Yes'} />{' '}
        <Button type={'button'} fnc={noFnc} text={'No'} />
      </div>
    </div>
  )
}

export default DeleteMessage
