import React from 'react'
import { useForm } from 'react-hook-form'

export default function CustomizationForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      height: 180,
      weight: 80,
      build: 'athletic',
    },
    mode: 'onChange'
  })

  const onSubmit = (data) => {
    console.log('Form submitted:', data)
    // In a real app, you would process the data here
  }

  // Watch values for real-time display
  const currentHeight = watch('height')
  const currentWeight = watch('weight')
  const currentBuild = watch('build')

  return (
    <div className="form-container">
      <div className="form-inner-container">
        <h3 className="section-heading">Customization Options</h3>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="height" className="form-label">Height in cm</label>
            <input 
              type="number" 
              id="height"
              {...register('height', { 
                required: 'Height is required',
                min: { value: 50, message: 'Height must be at least 50cm' },
                max: { value: 250, message: 'Height cannot exceed 250cm' },
              })} 
              className={`custom-input ${errors.height ? 'error' : ''}`}
            />
            {errors.height && (
              <span className="error-message">{errors.height.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="weight" className="form-label">Weight in kg</label>
            <input 
              type="number" 
              id="weight"
              {...register('weight', { 
                required: 'Weight is required',
                min: { value: 30, message: 'Weight must be at least 30kg' },
                max: { value: 200, message: 'Weight cannot exceed 200kg' },
              })} 
              className={`custom-input ${errors.weight ? 'error' : ''}`}
            />
            {errors.weight && (
              <span className="error-message">{errors.weight.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="build" className="form-label">Build</label>
            <select 
              id="build" 
              {...register('build', { required: 'Please select a build type' })} 
              className={`custom-input ${errors.build ? 'error' : ''}`}
            >
              <option value="lean">Lean</option>
              <option value="regular">Regular</option>
              <option value="athletic">Athletic</option>
              <option value="big">Big</option>
            </select>
            {errors.build && (
              <span className="error-message">{errors.build.message}</span>
            )}
          </div>

          <div className="size-recommendation">
            <p className="recommendation-text">
              Based on your measurements (Height: {currentHeight}cm, Weight: {currentWeight}kg, Build: {currentBuild}), 
              we recommend size: <strong>{getSizeRecommendation(currentHeight, currentWeight, currentBuild)}</strong>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

// Helper function to determine size recommendation based on measurements
function getSizeRecommendation(height, weight, build) {
  // Simple algorithm for size recommendation
  // In a real app, this would be more sophisticated
  let baseSize = ''
  
  if (height < 165) {
    baseSize = 'XS'
  } else if (height < 175) {
    baseSize = 'S'
  } else if (height < 185) {
    baseSize = 'M'
  } else if (height < 195) {
    baseSize = 'L'
  } else {
    baseSize = 'XL'
  }
  
  // Adjust for weight and build
  const bmi = weight / ((height / 100) ** 2)
  
  if (build === 'big' || bmi > 28) {
    return shiftSize(baseSize, 1) // Size up
  } else if (build === 'athletic' && bmi > 24) {
    return shiftSize(baseSize, 1) // Size up
  } else if (build === 'lean' && bmi < 20) {
    return shiftSize(baseSize, -1) // Size down
  }
  
  return baseSize
}

// Helper function to shift sizes up or down
function shiftSize(size, direction) {
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const currentIndex = sizes.indexOf(size)
  const newIndex = Math.min(Math.max(0, currentIndex + direction), sizes.length - 1)
  return sizes[newIndex]
}
