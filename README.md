# Health Counseling Application

## General Information

The Health Counseling Application is a mobile-based platform designed to provide users with AI-driven health insights and counseling services. The application utilizes a machine learning model to analyze health-related data and provide predictions or recommendations.

- **Frontend**: Built using React Native Expo, the frontend provides an intuitive and user-friendly interface for users to interact with the application.
- **Backend**: Developed using FastAPI, the backend handles data processing, model training, and prediction functionalities.
- **Machine Learning**: The backend includes a trained Transformer model that processes user inputs to provide health-related predictions.

## Folder Structure

The project is divided into two main sections: frontend and backend.

```plaintext
health-counseling-app/
│
├── frontend/          # Contains the React Native Expo application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── screens/     # Application screens
│   │   ├── assets/      # Images, icons, and other static assets
│   │   ├── navigation/  # Navigation setup
│   │   ├── utils/       # Helper functions
│   │   ├── services/    # API calls and services
│   │   ├── contexts/    # Context API for state management
│   │   ├── hooks/       # Custom hooks
│   │   ├── styles/      # Stylesheets and theme configuration
│   │   └── App.js       # Main entry point of the application
│   ├── package.json     # Project dependencies and scripts
│   ├── app.json         # Expo configuration file
│   └── README.md        # Frontend-specific documentation
│
├── backend/          # Contains the FastAPI backend
│   ├── models/       # Machine learning model and training scripts
│   ├── routes/       # API endpoints
│   ├── services/     # Business logic and utility functions
│   ├── database/     # Database connection and models
│   ├── config/       # Configuration files
│   ├── main.py       # Entry point for FastAPI application
│   ├── requirements.txt  # Backend dependencies
│   ├── Dockerfile    # Docker configuration (if needed)
│   └── README.md     # Backend-specific documentation
│
└── README.md        # General project documentation
```
