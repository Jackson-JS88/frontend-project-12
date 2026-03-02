const NotFoundPage = () => {
  
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="text-center">
        <h1 className="display-1 mb-4">404</h1>
        <p className="lead mb-4">Страница не найдена</p>
        <a href="/" className="btn btn-primary">
          Вернуться на главную
        </a>
      </div>
    </div>
  )
}

export default NotFoundPage
