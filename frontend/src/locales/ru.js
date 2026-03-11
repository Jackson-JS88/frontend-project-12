export default {
  translation: {
    // Общие
    appName: 'Hexlet Chat',
    loading: 'Загрузка...',
    send: 'Отправить',
    cancel: 'Отмена',
    save: 'Сохранить',
    delete: 'Удалить',
    rename: 'Переименовать',
    add: 'Добавить',
    logout: 'Выйти',
    
    // Навигация
    channels: 'Каналы',
    messages: {
      count_one: '{{count}} сообщение',
      count_few: '{{count}} сообщения',
      count_many: '{{count}} сообщений',
    },
    noMessages: 'Пока нет сообщений',
    beFirst: 'Будьте первым, кто напишет в этом канале!',
    chooseChannel: 'Выберите канал',
    
    // Авторизация
    login: {
      title: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      submit: 'Войти',
      noAccount: 'Нет аккаунта?',
      signup: 'Регистрация',
      errors: {
        invalid: 'Неверные имя пользователя или пароль',
      },
    },
    
    // Регистрация
    signup: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
      haveAccount: 'Уже есть аккаунт?',
      login: 'Войти',
      errors: {
        usernameLength: 'От 3 до 20 символов',
        passwordLength: 'Не менее 6 символов',
        passwordMatch: 'Пароли должны совпадать',
        userExists: 'Такой пользователь уже существует',
      },
    },
    
    // Каналы
    channel: {
      add: 'Добавить канал',
      rename: 'Переименовать канал',
      remove: 'Удалить канал',
      name: 'Имя канала',
      newName: 'Новое имя канала',
      confirmRemove: 'Вы уверены, что хотите удалить канал {{name}}?',
      removeWarning: 'Все сообщения канала будут удалены безвозвратно.',
      fixed: 'fixed',
      errors: {
        required: 'Обязательное поле',
        length: 'От 3 до 20 символов',
        unique: 'Канал с таким именем уже существует',
      },
    },
    
    // Сообщения
    message: {
      placeholder: 'Введите сообщение...',
      sending: 'отправляется...',
      error: 'ошибка',
    },
    
    // Меню канала
    menu: {
      rename: 'Переименовать',
      remove: 'Удалить',
    },
    
    // 404
    notFound: {
      title: '404',
      message: 'Страница не найдена',
      backToHome: 'Вернуться на главную',
    },

    // Уведомления
    toast: {
      
    // Ошибки
      networkError: 'Ошибка сети',
      loadError: 'Ошибка загрузки данных',
      
    // Каналы
      channelCreated: 'Канал создан',
      channelRenamed: 'Канал переименован',
      channelRemoved: 'Канал удалён',
      
    // Ошибки каналов
      channelCreateError: 'Не удалось создать канал',
      channelRenameError: 'Не удалось переименовать канал',
      channelRemoveError: 'Не удалось удалить канал',
    },
  }
}
