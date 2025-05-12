import React, { useEffect, useState } from 'react'
import ImageUpload from './components/ImageUpload'
import CustomizationForm from './components/CustomizationForm'
import TextInput from './components/TextInput'

const themes = ['theme-light', 'theme-dark', 'theme-vibrant']

// Default t-shirt placeholder from a CDN
const DEFAULT_TSHIRT_URL = 'https://cdn.pixabay.com/photo/2016/11/23/06/57/isolated-t-shirt-1852114_960_720.png'

export default function App() {
  const [themeIndex, setThemeIndex] = useState(1) // Start with dark theme
  const [previewImage, setPreviewImage] = useState(DEFAULT_TSHIRT_URL)

  const resetToDefault = () => {
    setPreviewImage(DEFAULT_TSHIRT_URL)
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.altKey && e.key.toLowerCase() === 'q') {
        setThemeIndex((prev) => (prev + 1) % themes.length)
      }
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    document.body.className = themes[themeIndex]
  }, [themeIndex])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>T-Shirt Customizer</h1>
        <p className="theme-hint">Press Alt+Q to switch themes</p>
      </header>
      
      <div className="horizontal-layout">
        {/* Left side - Image Preview */}
        <div className="left-panel">
          <div className="tshirt-preview">
            <img 
              src={previewImage} 
              alt="T-shirt preview" 
            />
            {previewImage !== DEFAULT_TSHIRT_URL && (
              <button 
                className="reset-btn" 
                onClick={resetToDefault}
                title="Reset to default t-shirt"
              >
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Right side - Upload and Customization */}
        <div className="right-panel">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            <ImageUpload setPreviewImage={setPreviewImage} />
            
            <CustomizationForm />
            
            <TextInput />
          </div>
        </div>
      </div>
    </div>
  )
}
