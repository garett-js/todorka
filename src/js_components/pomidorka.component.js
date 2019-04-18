import { Component }           from '../js_core/component'
import { pomidorkaController } from '../mvc/controllers/pomidorka.controller'
import { Validators }          from '../js_core/validators'
import { Form }                from '../js_core/form'

export class PomidorkaTimerComponent extends Component {
    constructor(id) {
        super(id)
    }

    static create(el) {
        return new PomidorkaTimerComponent(el)
    }

    init() {
        this.id_timer = null

        this.time      = '00:05'
        this.break     = '00:05'
        this.longBreak = '15:00'

        // Get block POMIDORKA TIMER
        this.$pomidorkaTimer = this.$el.querySelector('.pomidorka-timer')
        this.$pomidorkaTime  = this.$pomidorkaTimer.querySelector('.pomidorka-timer__time')
        this.$pomidorkaTitle = this.$pomidorkaTimer.querySelector('.pomidorka-timer__title')
        this.$startTimer     = this.$pomidorkaTimer.querySelector('.js-btn-start')
        this.$pauseTimer     = this.$pomidorkaTimer.querySelector('.js-btn-pause')
        this.$stopTimer      = this.$pomidorkaTimer.querySelector('.js-btn-end')

        this.$pomidorkaTime.innerHTML = this.time

        // Get block POMIDORKA LIST
        this.$pomidorkaList = document.querySelector('.pomidorka-list')
        // Get block POMIDORKA CONFIG FORM
        this.$configFormElement = document.querySelector('.pomidorka-config-form')
        // Get block POMIDORKA CREATE FORM
        this.$createFormElement = document.querySelector('.pomidorka-create-form')

        this.formConfig = Form.Create(this.$configFormElement, {
            fulltime: [Validators.required, Validators.maxLength(2), Validators.minLength(1)],
            breaktime: [Validators.required],
            longbreaktime: [Validators.required]
        })
        this.formCreate = Form.Create(this.$createFormElement, {
            pomidorkatitle: [Validators.required],
            count: [Validators.required]
        })
    }

    onShow() {
        super.onShow()
        if (!this.started) {
            this.startEventListining()
        }
        this.renderList(pomidorkaController)
    }

    async renderList(controller) {
        this.$pomidorkaList.innerHTML = ''
        const html = await controller.index()
        this.$pomidorkaList.insertAdjacentHTML('afterbegin', html.join(' '))
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
async function createFormHandler(event) {
    event.preventDefault()
    if (this.formCreate.isValid()) {
        const formData = {
            ...this.formCreate.value()
        }
        this.$pomidorkaList.insertAdjacentHTML('afterbegin', `<li>Количество ${formData.count} | ${formData.pomidorkatitle}</li>`)
        await pomidorkaController.create(formData)
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
        this.$pomidorkaTime.textContent = `${formData.fulltime}:00`
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
    addValueToElement(`00:05`, this.$pomidorkaTime)
    enabledFormControls(this.formConfig)
    resetBlockTimer.call(this)
}
function tickPomidorka() {
    
    let time_list = this.$pomidorkaTime.innerHTML.split(':')
    
    let min = time_list[0]
    let sec = time_list[1]

    if (sec == 0) {
        if (min == 0) {

            if (!this.isBreak) {
                this.$pomidorkaTimer.classList.add('pomidorka-timer_bg-color-break')     
                addValueToElement(`${this.break}`, this.$pomidorkaTime)  
                showElement(this.$pomidorkaTimer.querySelector('.break'))       
                this.isBreak = true
                return
            }

            resetBlockTimer.call(this) 
            addValueToElement(`${this.time}`, this.$pomidorkaTime)
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

    addValueToElement(`${min}:${sec}`, this.$pomidorkaTime)
    
    const asideTimer = document.querySelector('.js-aside-position').querySelector('.pomidorka-timer__time')
    addValueToElement(`${min}:${sec}`, asideTimer)
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
    el.classList.add('js-hide')
}
function showElement(el) {
    el.classList.remove('js-hide')
}
function visibilityHandler(toHideElement, toShowElement) {
    hideElement(toHideElement)
    showElement(toShowElement)
}
function addValueToElement(value, el) {
    el.innerHTML = value
}
function resetBlockTimer() {
    this.isBreak = false
    if (this.$pomidorkaTimer.classList.contains('pomidorka-timer_bg-color-break')) {
        this.$pomidorkaTimer.classList.remove('pomidorka-timer_bg-color-break')
    }
    hideElement(this.$pomidorkaTimer.querySelector('.break')) 
}