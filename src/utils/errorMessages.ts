export const registerMessages = (status: number) => {
    if (status === 400) return 'Введено не коректні дані.'
    if (status === 409) return 'Такий номер телефону або email вже використовується.'
    if (status === 500) return 'Помилка сервера. Спробуйте ще раз.'
    else return 'Невідома помилка. Спробуйте пізніше.'
}

export const loginMessages = (status: number) => {
    if (status === 400) return 'Введено не коректні дані.'
    if (status === 401) return 'Помилка авторизації. Перевірте логін або пароль.'
    if (status === 404) return 'Користувача не знайдено.'
    if (status === 500) return 'Помилка сервера. Спробуйте ще раз.'
    else return 'Невідома помилка. Спробуйте пізніше.'
}

export const changeNameMessages = (status: number) => {
    if (status === 400) return 'Введено не коректні дані.'
    if (status === 401) return 'Помилка авторизації. Перевірте пароль.'
    if (status === 404) return 'Користувача не знайдено.'
    if (status === 500) return 'Помилка сервера. Спробуйте ще раз.'
    else return 'Невідома помилка. Спробуйте пізніше.'
}

export const changePhoneMessages = (status: number) => {
    if (status === 400) return 'Введено не коректні дані.'
    if (status === 401) return 'Помилка авторизації. Перевірте пароль.'
    if (status === 404) return 'Користувача не знайдено.'
    if (status === 409) return 'Помилка. Номер телефону вже зареєстровано іншим користувачем.'
    if (status === 500) return 'Помилка сервера. Спробуйте ще раз.'
    else return 'Невідома помилка. Спробуйте пізніше.'
}

 export const changeEmailMessages = (status: number) => {
    if (status === 400) return 'Введено не коректні дані.'
    if (status === 401) return 'Помилка авторизації. Перевірте пароль.'
    if (status === 404) return 'Користувача не знайдено.'
    if (status === 409) return 'Помилка. Такий email вже зареєстровано іншим користувачем.'
    if (status === 500) return 'Помилка сервера. Спробуйте ще раз.'
    else return 'Невідома помилка. Спробуйте пізніше.'
}

export const unsubscribeMessages = (status: number) => {
    if (status === 400) return 'Невірний формат емейл. Перевірте, будь-ласка!'
    if (status === 404) return 'Ви вже відписані від розсилки!'
    else return 'Щось пішло не так! Спробуйте пізніше.'
}