import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './features/Auth/Register'
import routes from '../src/routes/routes'
import LoginPage from './features/Auth/Login'

const router = createBrowserRouter([
  {
    path: routes.auth.register,
    element: <Register/>
  },
  {
    path: routes.auth.login,
    element: <LoginPage/>
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
