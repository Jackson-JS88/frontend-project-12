import { useState } from 'react'


const ChannelMenu = ({ channel, onRename, onRemove, isActive }) => {
  const [showMenu, setShowMenu] = useState(false)

  const isRemovable = channel.removable !== false

  return (
    <div className="dropdown" style={{ position: 'relative' }}>
      <button
        className="btn btn-sm p-0 border-0"
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setShowMenu(!showMenu)
        }}
        style={{ 
          background: 'transparent',
          color: isActive ? 'white' : '#6c757d',
          fontSize: '1.5rem',
          lineHeight: 1,
          padding: '0 5px',
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        ⋮
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
              Переименовать
            </button>
            
            {isRemovable && (
              <button
                className="dropdown-item text-danger"
                onClick={() => {
                  setShowMenu(false)
                  onRemove()
                }}
              >
                Удалить
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
