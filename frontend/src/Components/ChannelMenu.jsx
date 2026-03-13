import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'


const ChannelMenu = ({ channel, onRename, onRemove, isActive }) => {
  const { t } = useTranslation()
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  const isRemovable = channel.removable !== false

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleToggleMenu = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setShowMenu(!showMenu)
  }

  const handleRenameClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setShowMenu(false)
    onRename()
  }

  const handleRemoveClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setShowMenu(false)
    onRemove()
  }

  return (
    <div ref={menuRef} style={{ display: 'inline-block' }}>
      <button
        type="button"
        id={`dropdown-${channel.id}`}
        aria-expanded={showMenu}
        aria-haspopup="true"
        className={`flex-grow-0 dropdown-toggle dropdown-toggle-split btn ${
          isActive ? 'btn-primary' : 'btn-secondary'
        }`}
        style={{
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
          borderTopRightRadius: '0.375rem',
          borderBottomRightRadius: '0.375rem',
          marginLeft: '0'
        }}
        onClick={handleToggleMenu}
      >
        <span className="visually-hidden">{t('menu.manage')}</span>
      </button>

      {showMenu && (
        <div
          className="dropdown-menu show"
          style={{
            position: 'absolute',
            inset: '0px 0px auto auto',
            transform: 'translate3d(0px, 38px, 0px)',
            zIndex: 1060,
            minWidth: '150px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {isRemovable && (
            <button
              className="dropdown-item"
              onClick={handleRemoveClick}
              type="button"
            >
              {t('menu.remove')}
            </button>
          )}
          <button
            className="dropdown-item"
            onClick={handleRenameClick}
            type="button"
          >
            {t('menu.rename')}
          </button>
        </div>
      )}

      {showMenu && (
        <div
          className="modal-backdrop show"
          style={{
            backgroundColor: 'transparent',
            position: 'fixed',
            inset: 0,
            zIndex: 1040,
          }}
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  )
}

export default ChannelMenu
