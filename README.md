# T-Shirt Customizer

A React application for customizing t-shirts with image uploads and text printing options.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Components](#components)
- [Theme System](#theme-system)
- [Form Handling](#form-handling)
- [Animations](#animations)
- [Size Recommendation](#size-recommendation)

## Overview

T-Shirt Customizer is a web application built with React that allows users to:
- Upload images to be printed on a t-shirt
- Add custom text to the t-shirt (max 3 lines)
- Set height, weight, and build specifications with size recommendations
- View a real-time preview of the customized t-shirt with zoom functionality
- Toggle between different UI themes using Alt+Q

The application features a responsive design with three distinct themes and smooth animations.

## Features

### T-Shirt Preview
- Real-time preview of the customized t-shirt
- Interactive zoom functionality when hovering/clicking on the image
- Reset functionality to return to the default t-shirt
- Theme-specific effects when zooming

### Customization Form
- Size inputs for height (cm) and weight (kg)
- Build dropdown with four options: Lean, Regular, Athletic, Big
- Default values: 180cm, 80kg, Athletic
- Automatic size recommendation based on measurements
- Form validation with react-hook-form

### Image Upload
- File selection via button click
- Drag-and-drop functionality for easy upload
- Preview of uploaded image in both the main display and the upload area
- File type and size validation (10MB maximum)
- Error messages for invalid uploads

### Text Input
- Multi-line text area for adding custom text
- Maximum of 3 lines restriction
- Character counter (max 200 characters)
- Line counter
- Copy to clipboard functionality
- Real-time validation with error messages

### Theme System
- Three different themes: Light, Dark, and Vibrant
- Toggle between themes using Alt+Q keyboard shortcut
- Theme-specific animations and styling
- Smooth transitions between themes
- Monochromatic styling for dark theme

### Animation System
- Fade-in animations for page elements
- Slide-in animations for panels
- Hover effects for interactive elements
- Zoom effect for t-shirt preview
- Theme-specific animation effects

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/t-shirt-customizer.git
   ```

2. Navigate to the project directory:
   ```
   cd t-shirt-customizer
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

## Usage

### Customizing a T-Shirt

1. **Upload an Image**:
   - Click the "Select File" button or drag and drop an image into the upload area
   - The image will appear on the t-shirt preview
   - Image will be validated for type and size

2. **Add Text**:
   - Enter your desired text in the text area (maximum 3 lines)
   - Text is automatically validated for line count and character limit
   - Use the copy button to copy the text to clipboard

3. **Set Size Parameters**:
   - Enter your height in centimeters (valid range: 50-250cm)
   - Enter your weight in kilograms (valid range: 30-200kg)
   - Select your build type from the dropdown
   - View the automatic size recommendation based on your measurements

4. **Preview the T-Shirt**:
   - Hover over the t-shirt to see a slight zoom effect
   - Click and hold to see a more detailed zoom with theme-specific effects

5. **Change Theme**:
   - Press Alt+Q to cycle through Light, Dark, and Vibrant themes
   - Note how animations and styling adapt to each theme

## Deployment

### Deploying to Cloudflare Pages

1. **Prepare your repository**:
   ```bash
   # Ensure your code is in a Git repository
   git init
   git add .
   git commit -m "Initial commit"
   
   # Push to GitHub or GitLab
   git remote add origin https://github.com/yourusername/t-shirt-customizer.git
   git push -u origin main
   ```

2. **Set up Cloudflare Pages**:
   - Create a Cloudflare account at https://dash.cloudflare.com/sign-up
   - In the Cloudflare dashboard, navigate to Pages
   - Click "Create a project" → "Connect to Git"
   - Authenticate with GitHub/GitLab and select your repository

3. **Configure build settings**:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variables: Add `NODE_VERSION=16.x` if needed

4. **Deploy your site**:
   - Click "Save and Deploy"
   - Wait for the build process to complete
   - Your site will be deployed to a URL like `your-project.pages.dev`

5. **Set up a custom domain (optional)**:
   - In your project, go to "Custom domains"
   - Add your domain and follow the DNS configuration steps
   - Cloudflare will automatically provision an SSL certificate

## Project Structure

```
t-shirt-customizer/
├── public/
├── src/
│   ├── components/
│   │   ├── CustomizationForm.jsx
│   │   ├── ImageUpload.jsx
│   │   └── TextInput.jsx
│   ├── styles/
│   │   ├── animations.css
│   │   ├── components.css
│   │   └── themes.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
└── vite.config.js
```

## Components

### App.jsx
The main component that renders the application and manages the theme state.

```jsx
// Key features
- Theme switching functionality with Alt+Q
- Layout structure (horizontal on desktop, vertical on mobile)
- T-shirt preview with image reset capability
```

### CustomizationForm.jsx
Handles the size and build customization options with automatic size recommendations.

```jsx
// Key features
- React Hook Form integration with validation
- Input fields for height and weight with min/max validation
- Build type dropdown
- Default values: 180cm, 80kg, Athletic
- Size recommendation algorithm based on height, weight and build
```

### ImageUpload.jsx
Manages image uploads with comprehensive validation.

```jsx
// Key features
- Drag and drop functionality with visual feedback
- File upload via button click
- Image preview in upload area
- File type and size validation
- Error messages for invalid uploads
```

### TextInput.jsx
Provides a text area for adding custom text with validation.

```jsx
// Key features
- Multi-line text input with validation
- Line and character counting
- Maximum 3 lines restriction
- Copy to clipboard function
- Error messages when limits are exceeded
```

## Theme System

The application features three themes:

1. **Dark Theme (Default)**
   - Dark background (#121212)
   - Light text (#e0e0e0)
   - Blue accent color (#3a86ff)
   - Monochromatic styling for interactive elements

2. **Light Theme**
   - Light background (#f5f5f5)
   - Dark text (#333333)
   - Blue accent color (#4361ee)
   - Subtle shadows and color accents

3. **Vibrant Theme**
   - Dark blue background (#0f172a)
   - White text (#f8fafc)
   - Pink accent color (#fb7185)
   - Bright, colorful interactive elements

Themes are implemented using CSS variables and toggled by changing the body class.

## Form Handling

The application uses react-hook-form for sophisticated form validation:

- **Declarative validation rules** for all inputs
- **Real-time feedback** with error messages
- **Custom validators** for complex validation like line count
- **Form watching** for dynamic UI updates
- **Controlled inputs** for a consistent user experience

## Animations

The app includes a variety of CSS animations to enhance the user experience:

- **Page Load Animations**: Elements fade and slide in sequentially
- **Hover Effects**: Interactive elements respond to user hover with subtle movements
- **Active States**: Buttons have satisfying click animations
- **T-shirt Zoom**: Custom zoom functionality on hover and click
- **Theme-Specific Effects**: Each theme has unique animation characteristics

## Size Recommendation

The application includes a sophisticated size recommendation system:

- Uses height, weight, and build to calculate appropriate t-shirt size
- Calculates BMI and adjusts recommendations accordingly
- Different builds affect size recommendations differently:
  - Athletic builds with higher BMI may need to size up
  - Lean builds with lower BMI may need to size down
- Displays recommendation in real-time as values change
