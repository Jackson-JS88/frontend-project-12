import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import Navbar from './Navbar'
import { signup } from '../services/api'


const SignupPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(3, t('signup.errors.usernameLength'))
      .max(20, t('signup.errors.usernameLength'))
      .required(t('channel.errors.required')),
    password: yup
      .string()
      .min(6, t('signup.errors.passwordLength'))
      .required(t('channel.errors.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('signup.errors.passwordMatch'))
      .required(t('channel.errors.required')),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {

        const response = await signup(values.username, values.password)
        
        if (response.token) {
          localStorage.setItem('token', response.token)
          localStorage.setItem('username', response.username)
          navigate('/chat')
        }
      } catch (error) {
        if (error.response?.status === 409) {
          setFieldError('username', t('signup.errors.userExists'))
        } else {
          alert(t('login.errors.invalid'))
        }
      } finally {
        setSubmitting(false)
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
                  <h1 className="text-center mb-4">{t('signup.title')}</h1>
                  
                  <div className="mb-3">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                      placeholder={t('signup.username')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      disabled={formik.isSubmitting}
                    />
                    {formik.touched.username && formik.errors.username && (
                      <div className="invalid-feedback">{formik.errors.username}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                      placeholder={t('signup.password')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      disabled={formik.isSubmitting}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="invalid-feedback">{formik.errors.password}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                      placeholder={t('signup.confirmPassword')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      disabled={formik.isSubmitting}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                      <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-100 mb-3 btn btn-primary"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? t('loading') : t('signup.submit')}
                  </button>
                </form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('signup.haveAccount')} </span>
                  <a href="/login">{t('signup.login')}</a>
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
