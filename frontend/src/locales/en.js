export default {
  translation: {
    // Общие
    appName: 'My Chat',
    loading: 'Loading...',
    send: 'Send',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    rename: 'Rename',
    add: 'Add',
    logout: 'Logout',
    
    // Навигация
    channels: 'Channels',
    messages: {
      count_one: '{{count}} message',
      count_other: '{{count}} messages',
    },
    noMessages: 'No messages yet',
    beFirst: 'Be the first to write in this channel!',
    chooseChannel: 'Choose a channel',
    
    // Авторизация
    login: {
      title: 'Login',
      username: 'Your nickname',
      password: 'Password',
      submit: 'Login',
      noAccount: 'No account?',
      signup: 'Sign up',
      errors: {
        invalid: 'Invalid username or password',
      },
    },
    
    // Регистрация
    signup: {
      title: 'Sign up',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm password',
      submit: 'Register',
      haveAccount: 'Already have an account?',
      login: 'Login',
      errors: {
        usernameLength: 'From 3 to 20 characters',
        passwordLength: 'At least 6 characters',
        passwordMatch: 'Passwords must match',
        userExists: 'User already exists',
      },
    },
    
    // Каналы
    channel: {
      add: 'Add channel',
      rename: 'Rename channel',
      remove: 'Remove channel',
      name: 'Channel name',
      newName: 'New channel name',
      confirmRemove: 'Are you sure you want to remove channel {{name}}?',
      removeWarning: 'All channel messages will be permanently deleted.',
      fixed: 'fixed',
      errors: {
        required: 'Required field',
        length: 'From 3 to 20 characters',
        unique: 'Channel with this name already exists',
      },
    },
    
    // Сообщения
    message: {
      placeholder: 'Enter message...',
      sending: 'sending...',
      error: 'error',
    },
    
    // Меню канала
    menu: {
      rename: 'Rename',
      remove: 'Remove',
    },
    
    // 404
    notFound: {
      title: '404',
      message: 'Page not found',
      backToHome: 'Back to home',
    },
  }
}
