import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { cleanText } from '../utils/profanityFilter'
import { getChannelSchema } from '../utils/validationSchemas'
import Modal from './Modal'

const RenameChannelModal = ({ isOpen, onClose, onRename, channel, existingChannels }) => {
  const { t } = useTranslation()
  const inputRef = useRef(null)

  const validationSchema = getChannelSchema(t, existingChannels, channel?.id)

  const formik = useFormik({
    initialValues: { name: channel?.name || '' },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const cleanedName = cleanText(values.name)
      await onRename(cleanedName)
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
          <label htmlFor="channel-name" className="form-label">
            {t('channel.name')}
          </label>
          <input
            ref={inputRef}
            id="channel-name"
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
