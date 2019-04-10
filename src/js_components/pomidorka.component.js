import { Component } from '../js_core/component'
import { Validators } from '../js_core/validators'
import { Form } from '../js_core/form'
import '../js_core/libs'

export class PomidorkaTimerComponent extends Component {
    constructor(id) {
        super(id)
    }

    static create(el) {
        return new PomidorkaTimerComponent(el)
    }

    init() {
        this.id_timer = null

        this.pomidorkaTime = '00:03'
        this.pomidorkaBreak = '5:00'
        this.pomidorkaLongBreak = '15:00'

        this.$time = this.$el.querySelector('.time')
        this.$time.innerHTML = this.pomidorkaTime

        this.$startTimer = this.$el.querySelector('.btn-start')
        this.$pauseTimer = this.$el.querySelector('.btn-pause')
        this.$stopTimer  = this.$el.querySelector('.btn-end')

        this.$pomidorkaList = document.getElementById('pomidorka-list')

        this.$configFormElement = document.getElementById('pomidorka-config')
        this.$createFormElement = document.getElementById('pomidorka-create')

        this.formConfig = Form.Create(this.$configFormElement, {
            fulltime: [Validators.required, Validators.maxLength(2), Validators.minLength(1)],
            breaktime: [Validators.required],
            longbreaktime: [Validators.required]
        })
        this.formCreate = Form.Create(this.$createFormElement, {
            pomidorkatitle: [Validators.required]
        })
    }

    onShow() {
        super.onShow()
        if (!this.started) {
            this.startEventListining()
        }
    }

    startEventListining() {
        this.started = true
        this.$startTimer.addEventListener('click', clickStartHandler.bind(this))
        this.$pauseTimer.addEventListener('click', clickPauseHandler.bind(this))
        this.$stopTimer.addEventListener('click', clickStopHandler.bind(this))

        this.$configFormElement.addEventListener('change', configFormtHandler.bind(this))
        this.$createFormElement.addEventListener('submit', createFormHandler.bind(this))
    }
}

// private
function createFormHandler(event) {
    event.preventDefault()
    if (this.formCreate.isValid()) {
        const formData = {
            ...this.formCreate.value()
        }
       
        this.$pomidorkaList.insertAdjacentHTML('afterend', `<li>${formData.pomidorkatitle}</li>`)
    }
}

function configFormtHandler(event) {
    event.preventDefault()
    if (this.formConfig.isValid()) {
        enabledElement(this.$startTimer)
        enabledElement(this.$stopTimer)
        const formData = {
            ...this.formConfig.value()
        }
        console.log(formData)
        
        this.$time.textContent = `${formData.fulltime}:00`
    } else {
        disabledElement(this.$startTimer)
        disabledElement(this.$stopTimer)
    }
}

function clickStartHandler(event) {
    visibilityHandler(event.target, this.$pauseTimer)
    this.id_timer = setInterval(tickPomidorka.bind(this), 1000)
    disabledFormControls(this.formConfig)
}
function clickPauseHandler(event) {
    visibilityHandler(event.target, this.$startTimer)
    clearInterval(this.id_timer)
}
function clickStopHandler() {
    visibilityHandler(this.$pauseTimer, this.$startTimer)
    clearInterval(this.id_timer)
    addValueToElement(`25:00`, this.$time)
    enabledFormControls(this.formConfig)
}
function tickPomidorka() {
    let time_list = this.$time.innerHTML.split(':')
    let min = time_list[0]
    let sec = time_list[1]

    if (sec == 0) {
        if (min == 0) {
            addValueToElement(`${this.pomidorkaTime}`, this.$time)
            visibilityHandler(this.$pauseTimer, this.$startTimer)
            enabledFormControls(this.formConfig)
            clearInterval(this.id_timer)
            return
        }
        min--
        if (min < 10) { min = "0" + min }
        sec = 59
    } else sec--
    if (sec < 10) { sec = "0" + sec }

    addValueToElement(`${min}:${sec}`, this.$time)
}
function enabledFormControls(formOject) {
    Object.keys(formOject.controls).forEach((control) => {
        formOject.form[control].removeAttribute("disabled")      
    })
}
function disabledFormControls(formOject) {
    Object.keys(formOject.controls).forEach((control) => {
        formOject.form[control].setAttribute("disabled", "disabled")      
    })
}

function enabledElement(el) {
    el.removeAttribute('disabled')
    el.classList.remove('disabled')
}
function disabledElement(el) {
    el.setAttribute('disabled', 'disabled')
    el.classList.add('disabled')
}


function hideElement(el) {
    el.classList.add('hide')
}

function showElement(el) {
    el.classList.remove('hide')
}

function visibilityHandler(toHideElement, toShowElement) {
    hideElement(toHideElement)
    showElement(toShowElement)
}

function addValueToElement(value, el) {
    el.innerHTML = value
}