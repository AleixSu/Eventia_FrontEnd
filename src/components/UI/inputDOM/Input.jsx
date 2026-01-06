import React from 'react'

const Input = ({
  id,
  labelText,
  type = 'text',
  className = '',
  placeholder = '',
  required = false,
  register,
  errors,
  errorMessage,
  accept
}) => {
  const rules = {
    ...(required && { required: errorMessage })
  }

  return (
    <div className={className}>
      <label htmlFor={id}>{labelText}</label>
      <input
        {...register(id, rules)}
        type={type}
        className={errors?.[id] ? `${id} redInput` : id}
        id={id}
        placeholder={placeholder}
        accept={accept}
      />
      <span className='errorMessage'>
        {errors?.[id] ? errorMessage : null}{' '}
      </span>
    </div>
  )
}

export default Input
