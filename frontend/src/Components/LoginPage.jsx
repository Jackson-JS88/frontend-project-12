import { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from './Navbar'
import { login } from '../services/api'


const LoginPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [authError, setAuthError] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await login(values.username, values.password)
        
        if (response.token) {
          localStorage.setItem('token', response.token)
          localStorage.setItem('username', response.username)
          navigate('/chat')
        }
      } catch {
        setAuthError(true)
      }
    },
  })

  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body p-5">
                <form onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">{t('login.title')}</h1>
                  
                  <div className="form-floating mb-3">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className={`form-control ${authError ? 'is-invalid' : ''}`}
                      placeholder={t('login.username')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      autoComplete="username"
                      required
                    />
                    <label htmlFor="username">{t('login.username')}</label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className={`form-control ${authError ? 'is-invalid' : ''}`}
                      placeholder={t('login.password')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      autoComplete="current-password"
                      required
                    />
                    <label htmlFor="password">{t('login.password')}</label>
                    {authError && (
                      <div className="invalid-feedback">
                        {t('login.errors.invalid')}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-100 mb-3 btn btn-outline-primary"
                  >
                    {t('login.submit')}
                  </button>
                </form>
              </div>
              
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('login.noAccount')} </span>
                  <a href="/signup">{t('login.signup')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
