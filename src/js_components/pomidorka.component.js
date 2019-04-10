import { Component } from '../js_core/component'
import { Validators } from '../js_core/validators'
import { Form } from '../js_core/form'

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

        this.$createFormElement.addEventListener('submit', (event) => {
            event.preventDefault()

            if (this.formCreate.isValid()) {
                const formData = {
                    ...this.formCreate.value()
                }
                console.log('FormCreate Data >', formData)

            }
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

        this.$configFormElement.addEventListener('change', changeConfigFormElementHandler.bind(this))
        // this.$createFormElement.addEventListener('submit', submitCreateFormHandler.bind(this))
    }
}

// private
function changeConfigFormElementHandler(event) {
    event.preventDefault()

        if (this.formConfig.isValid()) {
            const formData = {
                ...this.formConfig.value()
            }
            console.log('FormConfig Data >', formData)
            this.$time.textContent = `${formData.fulltime}:00`
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

    // this.$time.textContent = `${this.pomidorkaTime}:00`
}
function submitCreateFormHandler(event) {

}
function clickStartHandler(event) {
    visibilityHandler(event.target, this.$pauseTimer)
    this.id_timer = setInterval(tickPomidorka.bind(this), 1000)
    // fulltime.setAttribute("disabled", "disabled")
}
function clickPauseHandler(event) {
    visibilityHandler(event.target, this.$startTimer)
    clearInterval(this.id_timer)
}
function clickStopHandler() {
    visibilityHandler(this.$pauseTimer, this.$startTimer)
    clearInterval(this.id_timer)
    addValueToElement(`25:00`, this.$time)
    // $fulltime.removeAttribute("disabled")
}
function tickPomidorka() {
    let time_list = this.$time.innerHTML.split(':')
    let min = time_list[0]
    let sec = time_list[1]

    if (sec == 0) {
        if (min == 0) {
            addValueToElement(`${this.pomidorkaTime}`, this.$time)
            visibilityHandler(this.$pauseTimer, this.$startTimer)

            // fulltime.removeAttribute("disabled")
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