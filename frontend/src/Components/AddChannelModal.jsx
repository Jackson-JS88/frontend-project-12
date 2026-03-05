import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Modal from './Modal'


const AddChannelModal = ({ isOpen, onClose, onAdd, existingChannels }) => {
  const inputRef = useRef(null)

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле')
      .test('unique', 'Канал с таким именем уже существует', (value) => {
        return !existingChannels.some(
          (channel) => channel.name.toLowerCase() === value?.toLowerCase()
        )
      }),
  })

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await onAdd(values.name)
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
    <Modal isOpen={isOpen} onClose={onClose} title="Добавить канал">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <input
            ref={inputRef}
            name="name"
            type="text"
            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
            placeholder="Имя канала"
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
            Отмена
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Добавление...' : 'Добавить'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddChannelModal
