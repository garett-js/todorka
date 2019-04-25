import { Component } from '../../core/component'
import { Validators } from '../../core/validators'
import { Form } from '../../core/form'

export default class PomidorkaConfigFormComponent extends Component {
    constructor(id,  data = {}) {
        super(id)    

        this.data = data

        this.time = `${this.formConfig.value().fulltime}:00`
        this.break = `${this.formConfig.value().breaktime}:00`
        this.longBreak = `${this.formConfig.value().longbreaktime}:00`
    }

    init() {
        this.formConfig = Form.Create(this.$el, {
            fulltime: [Validators.required, Validators.maxLength(2), Validators.minLength(1)],
            breaktime: [Validators.required],
            longbreaktime: [Validators.required]
        })       
    }

    onShow() {
        this.startEventListining()
    }

    startEventListining() {       
        this.$el.addEventListener('change', configFormHandler.bind(this))
    }
}

function configFormHandler(event) {
    event.preventDefault()
    if (this.formConfig.isValid()) {
        enabledElement(this.data.startTimer)
        enabledElement(this.data.stopTimer)
        const formData = {
            ...this.formConfig.value()
        }
        this.data.pomidorkaTime.textContent = `${formData.fulltime}:00`  
        this.time      = `${formData.fulltime}:00`
        this.break     = `${formData.breaktime}:00`
        this.longBreak = `${formData.longbreaktime}:00`
    } else {
        disabledElement(this.data.startTimer)
        disabledElement(this.data.stopTimer)
    }
}
function enabledElement(el) {
    el.removeAttribute('disabled')
    el.classList.remove('disabled')
}
function disabledElement(el) {
    el.setAttribute('disabled', 'disabled')
    el.classList.add('disabled')
}