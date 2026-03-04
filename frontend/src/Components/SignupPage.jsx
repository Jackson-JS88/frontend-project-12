import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { signup } from '../services/api'


const SignupPage = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      try {
        if (values.password !== values.confirmPassword) {
          alert('Пароли не совпадают')
          return
        }

        const response = await signup(values.username, values.password)
        
        if (response.token) {
          localStorage.setItem('token', response.token)
          navigate('/chat')
        }
      } catch (error) {
        if (error.response?.status === 409) {
          alert('Пользователь с таким именем уже существует')
        } else {
          alert('Ошибка при регистрации')
        }
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
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center" />
                <form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">Регистрация</h1>
                  
                  <div className="form-floating mb-3">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className="form-control"
                      placeholder="Имя пользователя"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      required
                    />
                    <label htmlFor="username">Имя пользователя</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Пароль"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      required
                      minLength="6"
                    />
                    <label htmlFor="password">Пароль</label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="form-control"
                      placeholder="Подтвердите пароль"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      required
                    />
                    <label htmlFor="confirmPassword">Подтвердите пароль</label>
                  </div>

                  <button
                    type="submit"
                    className="w-100 mb-3 btn btn-primary"
                  >
                    Зарегистрироваться
                  </button>
                </form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Уже есть аккаунт? </span>
                  <a href="/login">Войти</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
