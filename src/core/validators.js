export class Validators {
    // Проверка на обязательное наличе значения поля
    static required(value = '') {
        const result = value && value.trim()
        return (!result) ? {isValid: result, msg: 'Поле не должно быть пустым'} : { isValid: true }
    }

    static minLength(length) {
        return (value) => {
            const result = value.length >= length
            return (!result) ? {isValid: result, msg: `Минимальная длина ${length} `} : { isValid: true }
        }
    }

    static maxLength(length) {
        return (value) => {
            const result = value.length <= length
            return (!result) ? {isValid: result, msg: `Максимальная длина ${length} `} : { isValid: true }
        }
    }

    static positiveOnly(value = '') {
        return (value.trim() < 0) ? {isValid: false, msg: 'Время не может быть отрицательным'} : {isValid: true}
    }
}