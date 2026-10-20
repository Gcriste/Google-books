import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import Text from './text'

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

const inputClass =
  'w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, id, className = '', ...rest }, ref) => {
    const inputId = id ?? rest.name

    return (
      <div className={className}>
        <label htmlFor={inputId} className="block mb-1">
          <Text size="small">{label}</Text>
        </label>
        <input id={inputId} ref={ref} className={inputClass} {...rest} />
        {error && <Text variant="error">{error}</Text>}
      </div>
    )
  }
)

FormField.displayName = 'FormField'

export default FormField
