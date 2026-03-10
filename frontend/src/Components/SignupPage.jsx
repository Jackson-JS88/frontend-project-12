import { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import Navbar from './Navbar'
import { signup } from '../services/api'


const SignupPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [userExistsError, setUserExistsError] = useState(false)

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
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setUserExistsError(false)
        const response = await signup(values.username, values.password)
        
        if (response.token) {
          localStorage.setItem('token', response.token)
          localStorage.setItem('username', response.username)
          navigate('/chat')
        }
      } catch (error) {
        if (error.response?.status === 409) {
          setUserExistsError(true)
        } else {
          alert(t('login.errors.invalid'))
        }
      } finally {
        setSubmitting(false)
      }
    },
  })

  const hasError = (field) => {
    return (formik.touched[field] && formik.errors[field]) || userExistsError
  }

  const getFieldClass = (field) => {
    return `form-control ${hasError(field) ? 'is-invalid' : ''}`
  }

  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body p-5">
                <form onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">{t('signup.title')}</h1>
                  
                  <div className="form-floating mb-3">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className={getFieldClass('username')}
                      placeholder={t('signup.errors.usernameLength')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      disabled={formik.isSubmitting}
                    />
                    <label htmlFor="username">{t('signup.username')}</label>
                    {formik.touched.username && formik.errors.username && (
                      <div className="invalid-tooltip">{formik.errors.username}</div>
                    )}
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className={getFieldClass('password')}
                      placeholder={t('signup.errors.passwordLength')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      disabled={formik.isSubmitting}
                    />
                    <label htmlFor="password">{t('signup.password')}</label>
                    {formik.touched.password && formik.errors.password && (
                      <div className="invalid-tooltip">{formik.errors.password}</div>
                    )}
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className={getFieldClass('confirmPassword')}
                      placeholder={t('signup.errors.passwordMatch')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      disabled={formik.isSubmitting}
                    />
                    <label htmlFor="confirmPassword">{t('signup.confirmPassword')}</label>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                      <div className="invalid-tooltip">{formik.errors.confirmPassword}</div>
                    )}
                    {userExistsError && (
                      <div className="invalid-tooltip">
                        {t('signup.errors.userExists')}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-100 btn btn-outline-primary"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? t('loading') : t('signup.submit')}
                  </button>
                  
                  <div className="text-center mt-3">
                    <span>{t('signup.haveAccount')} </span>
                    <a href="/login">{t('signup.login')}</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
