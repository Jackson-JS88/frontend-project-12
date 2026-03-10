import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import Modal from './Modal'


const RenameChannelModal = ({ isOpen, onClose, onRename, channel, existingChannels }) => {
  const { t } = useTranslation()
  const inputRef = useRef(null)

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, t('channel.errors.length'))
      .max(20, t('channel.errors.length'))
      .required(t('channel.errors.required'))
      .test('unique', t('channel.errors.unique'), (value) => {
        return !existingChannels.some(
          (ch) => ch.id !== channel?.id && ch.name.toLowerCase() === value?.toLowerCase()
        )
      }),
  })

  const formik = useFormik({
    initialValues: { name: channel?.name || '' },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await onRename(values.name)
      setSubmitting(false)
      onClose()
    },
  })

  useEffect(() => {
    if (isOpen && channel) {
      formik.setValues({ name: channel.name })
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, channel])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !formik.isSubmitting) {
      formik.handleSubmit()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('channel.rename')}>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <input
            ref={inputRef}
            name="name"
            type="text"
            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
            placeholder={t('channel.newName')}
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
            {formik.isSubmitting ? t('loading') : t('save')}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default RenameChannelModal
