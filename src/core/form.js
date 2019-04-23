export class Form {
    constructor(form, controls = []) {
        this.form = form
        this.controls = controls
    }

    static Create(form, controls) {
        return new Form(form, controls)
    }

    value() {
        const value = {}
        Object.keys(this.controls).forEach( control => {
            // Обращаться к объекту по ключу через точку нельзя только так []
            // Тоже самое с формой
            value[control] = this.form[control].value
        })
        return value
    }

    clearControls() {
        Object.keys(this.controls).forEach( control => {
            this.form[control].value = ''
        })
    }

    clearAll() {
        Object.keys(this.controls).forEach(control => {
            clearError(this.form[control])
            this.form[control].value = ''
        })
    }

    isValid() {
        let isFormValid = true
        Object.keys(this.controls).forEach(control => {
            const validators = this.controls[control]

            let isValid = true
            let validObj = {}
            let invalidMessages = []

            validators.forEach(validator => {
                validObj = validator(this.form[control].value)
                isValid = validObj.isValid && isValid

                if (validObj.msg) {
                    invalidMessages.push(validObj.msg)
                }
            })

            console.log(invalidMessages)
            const msg = invalidMessages.join('<br>')

            !isValid ?  setError(this.form, this.form[control], msg) : clearError(this.form, this.form[control])

            isFormValid = isFormValid && isValid
         })
        return isFormValid
    }
}

function setError($form, $control, message) {
    clearError($form, $control)  
    $control.value = ''
    const error = `<p class="validation-error">${message}</p>`
    $control.classList.add('control-invalid')
    $control.insertAdjacentHTML('afterend', error)
}

function clearError($form, $control) {
    $control.classList.remove('control-invalid')

    if ($control.nextElementSibling) {      
        $control.closest('label').removeChild($control.nextElementSibling)
    }
}