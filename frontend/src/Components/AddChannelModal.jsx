import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { cleanText } from '../utils/profanityFilter'
import Modal from './Modal'


const AddChannelModal = ({ isOpen, onClose, onAdd, existingChannels }) => {
  const { t } = useTranslation()
  const inputRef = useRef(null)

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, t('channel.errors.length'))
      .max(20, t('channel.errors.length'))
      .required(t('channel.errors.required'))
      .test('unique', t('channel.errors.unique'), (value) => {
        const cleanedValue = cleanText(value)
        return !existingChannels.some(
          (channel) => channel.name.toLowerCase() === cleanedValue?.toLowerCase()
        )
      }),
  })

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const cleanedName = cleanText(values.name)
      await onAdd(cleanedName)
      setSubmitting(false)
      onClose()
    },
  })

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      formik.resetForm()
    }
  }, [isOpen])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !formik.isSubmitting) {
      formik.handleSubmit()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('channel.add')}>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <input
            ref={inputRef}
            name="name"
            type="text"
            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
            placeholder={t('channel.name')}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onKeyDown={handleKeyDown}
            value={formik.values.name}
            disabled={formik.isSubmitting}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="invalid-feedback">{formik.errors.name}</div>
          )}
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={onClose}
            disabled={formik.isSubmitting}
          >
            {t('cancel')}
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? t('loading') : t('add')}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddChannelModal
