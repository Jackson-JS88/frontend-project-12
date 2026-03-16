import * as yup from 'yup'

export const getChannelSchema = (t, existingChannels, currentChannelId = null) => yup.object({
  name: yup
    .string()
    .min(3, t('channel.errors.length'))
    .max(20, t('channel.errors.length'))
    .required(t('channel.errors.required'))
    .test('unique', t('channel.errors.unique'), (value) => {
      const cleanedValue = value?.trim()
      return !existingChannels.some(
        channel => channel.id !== currentChannelId && channel.name.toLowerCase() === cleanedValue?.toLowerCase(),
      )
    }),
})

export const getSignupSchema = t => yup.object({
  username: yup
    .string()
    .min(3, t('signup.errors.usernameLength'))
    .max(20, t('signup.errors.usernameLength'))
    .required(t('channel.errors.required')),
  password: yup
    .string()
    .min(6, t('signup.errors.passwordLength'))
    .required(t('channel.errors.required')),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], t('signup.errors.passwordMatch'))
    .required(t('channel.errors.required')),
})

export const getLoginSchema = t => yup.object({
  username: yup.string().required(t('channel.errors.required')),
  password: yup.string().required(t('channel.errors.required')),
})
