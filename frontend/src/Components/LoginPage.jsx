import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './Navbar'
import { login } from '../api'

const LoginPage = () => {
  const navigate = useNavigate()
  const [authError, setAuthError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true)
      setAuthError(null)
      
      try {
        const data = await login(values.username, values.password)
        localStorage.setItem('token', data.token)
        navigate('/')
      } catch (error) {
        console.error('Login error:', error)
        if (error.response && error.response.status === 401) {
          setAuthError('Неверные имя пользователя или пароль')
        } else {
          setAuthError('Ошибка соединения с сервером')
        }
      } finally {
        setIsLoading(false)
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
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  
                </div>
                <form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">Войти</h1>
                  {authError && (
                    <div className="alert alert-danger" role="alert">
                      {authError}
                    </div>
                  )}
                  
                  <div className="form-floating mb-3">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                      placeholder="Ваш ник"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      disabled={isLoading}
                      required
                    />
                    <label htmlFor="username">Ваш ник</label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                      placeholder="Пароль"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      disabled={isLoading}
                      required
                    />
                    <label htmlFor="password">Пароль</label>
                  </div>

                  <button
                    type="submit"
                    className="w-100 mb-3 btn btn-outline-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Вход...
                      </>
                    ) : (
                      'Войти'
                    )}
                  </button>
                </form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта? </span>
                  <a href="/signup">Регистрация</a>
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
