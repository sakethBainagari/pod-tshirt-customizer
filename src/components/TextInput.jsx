import React from 'react'
import { useForm } from 'react-hook-form'

export default function TextInput() {
  const MAX_LINES = 3
  const MAX_CHARS = 200
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      printText: ''
    },
    mode: 'onChange'
  })

  const text = watch('printText') || ''
  
  const onSubmit = (data) => {
    console.log('Text submitted:', data)
    // In a real app, you would process the data here
  }

  const validateLineCount = (value) => {
    if (!value) return true
    const lineCount = value.split('\n').length
    return lineCount <= MAX_LINES || `Maximum ${MAX_LINES} lines allowed`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Could add a copied notification here
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
      })
  }

  return (
    <div className="form-container">
      <div className="form-inner-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-header">
            <label htmlFor="print-text" className="form-label">Text to print (max 3 lines)</label>
            <button 
              type="button"
              className="copy-button"
              aria-label="Copy to clipboard"
              onClick={handleCopy}
              onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '0.7'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            </button>
          </div>
          <textarea 
            id="print-text"
            {...register('printText', {
              maxLength: {
                value: MAX_CHARS,
                message: `Maximum ${MAX_CHARS} characters allowed`
              },
              validate: validateLineCount
            })}
            placeholder="Enter your text here..."
            rows={3}
            className={`custom-textarea ${errors.printText ? 'error' : ''}`}
          />
          {errors.printText && (
            <span className="error-message">{errors.printText.message}</span>
          )}
          <div className="input-stats">
            <span>{text.length}/{MAX_CHARS} characters</span>
            <span>{text.split('\n').length}/{MAX_LINES} lines</span>
          </div>
        </form>
      </div>
    </div>
  )
}
