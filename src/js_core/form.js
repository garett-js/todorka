export class Form {
    constructor(form, controls = []) {
        this.form = form
        this.controls = controls

        console.log('Form.Create() ->', this.form, this,controls)
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

            validators.forEach(validator => {
                isValid = validator(this.form[control].value) && isValid
            })

            !isValid ? setError(this.form[control]) : clearError(this.form[control])

            isFormValid = isFormValid && isValid
         })
        return isFormValid
    }
}

function setError($control) {
    clearError($control)
    const error = '<p class="validation-error">Введите корректное значение</p>'
    $control.classList.add('invalid')
    $control.insertAdjacentHTML('afterend', error)
}

function clearError($control) {
    $control.classList.remove('invalid')
    if ($control.nextSibling) {
        $control.closest('.form-control').removeChild($control.nextSibling)
    }
}