import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ImageUpload({ setPreviewImage }) {
  const [image, setImage] = useState(null)
  const [draggingOver, setDraggingOver] = useState(false)
  
  const { 
    register, 
    handleSubmit, 
    setValue,
    formState: { errors } 
  } = useForm({
    mode: 'onChange'
  })

  const handleDragOver = (e) => {
    e.preventDefault()
    setDraggingOver(true)
  }

  const handleDragLeave = () => {
    setDraggingOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDraggingOver(false)
    const file = e.dataTransfer.files[0]
    processFile(file)
  }

  const handleUpload = (e) => {
    const file = e.target.files[0]
    processFile(file)
  }
  
  const processFile = (file) => {
    if (!file) return
    
    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setValue('imageFile', null, { shouldValidate: true })
      return
    }
    
    // Validate file type
    if (!file.type.match('image.*')) {
      setValue('imageFile', null, { shouldValidate: true })
      return
    }
    
    setValue('imageFile', file, { shouldValidate: true })
    
    const imageUrl = URL.createObjectURL(file)
    setImage(imageUrl)
    if (setPreviewImage) setPreviewImage(imageUrl)
  }
  
  const onSubmit = (data) => {
    console.log('Image submitted:', data)
    // In a real app, you would process the data here
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div 
          className={`upload-box ${draggingOver ? 'active' : ''} ${errors.imageFile ? 'error' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {image ? (
            <div className="uploaded-preview">
              <img 
                src={image} 
                alt="Uploaded" 
              />
              <p className="upload-text">Drop a new image here or</p>
              <button 
                type="button" 
                className="upload-button"
                onClick={() => document.getElementById('upload').click()}
              >
                Select File
              </button>
            </div>
          ) : (
            <>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="12" y1="8" x2="12" y2="16" />
              </svg>
              <p className="upload-text">Drop an image here or</p>
              <button 
                type="button" 
                className="upload-button"
                onClick={() => document.getElementById('upload').click()}
              >
                Select File
              </button>
              <p className="upload-note">10 MB maximum</p>
            </>
          )}
          <input 
            type="file"
            id="upload"
            {...register('imageFile', {
              validate: {
                required: file => file && file.length > 0 || 'Please select an image',
                fileType: file => !file || file[0]?.type.match('image.*') || 'Please upload an image file',
                fileSize: file => !file || file[0]?.size <= 10 * 1024 * 1024 || 'Image must be less than 10MB'
              }
            })}
            onChange={handleUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
          {errors.imageFile && (
            <span className="error-message">{errors.imageFile.message}</span>
          )}
        </div>
      </form>
    </div>
  )
}
