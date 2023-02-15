import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import './index.css'

// Páginas
import Cat from "./routes/Cat"
import Vaccine from "./routes/Vaccine"

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Cat />
      },
      {
        path: "/vaccines",
        element: <Vaccine />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
