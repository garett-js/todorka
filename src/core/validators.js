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
    // if (event.target.value.length > 2 || event.target.value > 60) {
    //     alert('Не больше 60 минут')
    //     event.target.value = '25'
    // }
    // if (event.target.value != 0) {
    //     if (!parseInt(event.target.value)) {
    //         alert('Это что за дичь тут мне подсунули!?')
    //         event.target.value = '25'
    //     }
    // }
    // if (event.target.value == 0) {
    //     event.target.value = '25'
    // }
    // if (event.target.value < 0) {
    //     alert('Это как так???')
    //     event.target.value = '25'
    // }