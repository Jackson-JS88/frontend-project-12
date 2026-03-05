import { useState } from 'react'
import Modal from './Modal'


const RemoveChannelModal = ({ isOpen, onClose, onRemove, channel }) => {
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = async () => {
    setIsRemoving(true)
    await onRemove()
    setIsRemoving(false)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Удалить канал">
      <p className="mb-4">
        Вы уверены, что хотите удалить канал <strong>#{channel?.name}</strong>?
        <br />
        <span className="text-danger">Все сообщения канала будут удалены безвозвратно.</span>
      </p>

      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={onClose}
          disabled={isRemoving}
        >
          Отмена
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleRemove}
          disabled={isRemoving}
        >
          {isRemoving ? 'Удаление...' : 'Удалить'}
        </button>
      </div>
    </Modal>
  )
}

export default RemoveChannelModal
