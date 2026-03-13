import { useState } from 'react'
import { useTranslation } from 'react-i18next'


const ChannelMenu = ({ channel, onRename, onRemove, isActive }) => {
  const { t } = useTranslation()
  const [showMenu, setShowMenu] = useState(false)

  const isRemovable = channel.removable !== false

  return (
    <div className="dropdown" style={{ position: 'relative' }}>
      <button
        className="btn btn-sm p-0 border-0 d-inline-flex align-items-center"
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setShowMenu(!showMenu)
        }}
        aria-label="Управление каналом"
        style={{ 
          color: isActive ? 'white' : '#6c757d',
          fontSize: '1.5rem',
          lineHeight: 1,
          padding: '0 5px',
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        <span className="visually-hidden">Управление каналом</span>
        <span aria-hidden="true">⋮</span>
      </button>
      
      {showMenu && (
        <>
          <div 
            className="dropdown-menu show" 
            style={{ 
              position: 'absolute', 
              right: 0,
              left: 'auto',
              transform: 'translate(0, 25px)',
              zIndex: 1060,
              minWidth: '150px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="dropdown-item"
              onClick={() => {
                setShowMenu(false)
                onRename()
              }}
            >
              {t('menu.rename')}
            </button>
            
            {isRemovable && (
              <button
                className="dropdown-item text-danger"
                onClick={() => {
                  setShowMenu(false)
                  onRemove()
                }}
              >
                {t('menu.remove')}
              </button>
            )}
          </div>
          <div
            className="modal-backdrop show"
            style={{ 
              backgroundColor: 'transparent', 
              zIndex: 1050,
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
            onClick={() => setShowMenu(false)}
          />
        </>
      )}
    </div>
  )
}

export default ChannelMenu
