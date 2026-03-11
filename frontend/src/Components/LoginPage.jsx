import { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { login } from '../services/api'


const LoginPage = () => {
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
                  <h1 className="text-center mb-4">Войти</h1>
                  
                  <div className="form-floating mb-3">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className={`form-control ${authError ? 'is-invalid' : ''}`}
                      placeholder="Ваш ник"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      autoComplete="username"
                      required
                    />
                    <label htmlFor="username">Ваш ник</label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className={`form-control ${authError ? 'is-invalid' : ''}`}
                      placeholder="Пароль"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      autoComplete="current-password"
                      required
                    />
                    <label htmlFor="password">Пароль</label>
                    {authError && (
                      <div className="invalid-feedback">
                        Неверные имя пользователя или пароль
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-100 mb-3 btn btn-outline-primary"
                  >
                    Войти
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