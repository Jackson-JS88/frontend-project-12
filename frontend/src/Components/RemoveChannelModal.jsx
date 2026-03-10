import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from './Modal'


const RemoveChannelModal = ({ isOpen, onClose, onRemove, channel }) => {
  const { t } = useTranslation()
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = async () => {
    setIsRemoving(true)
    try {
      await onRemove()
      onClose()
    } catch (error) {
      console.error('Error removing channel:', error)
    } finally {
      setIsRemoving(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('channel.remove')}>
      <p className="mb-4">
        {t('channel.confirmRemove', { name: channel?.name })}
        <br />
        <span className="text-danger">{t('channel.removeWarning')}</span>
      </p>

      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={onClose}
          disabled={isRemoving}
        >
          {t('cancel')}
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleRemove}
          disabled={isRemoving}
        >
          {isRemoving ? t('loading') : t('delete')}
        </button>
      </div>
    </Modal>
  )
}

export default RemoveChannelModal
