import Navbar from './Navbar'

const MainPage = () => {
  
  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 text-center">
            <h1 className="mb-4">Hexlet Chat</h1>
            <a href="/login" className="btn btn-primary">Войти</a>
            <div className="mt-3">
              <span className="text-muted">Нет аккаунта? </span>
              <a href="/signup" className="text-decoration-none">Регистрация</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
