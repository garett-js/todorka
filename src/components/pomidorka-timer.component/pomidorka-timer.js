import { Component } from '../../core/component'
import { enabledFormControls, disabledFormControls, hideElement, showElement, visibilityHandler ,addValueToElement} from '../../libs/help-functions'
import { Pomidorka } from '../../mvc/models/pomidorka.model'

export default class PomidorkaTimerComponent extends Component {
    constructor(id, comp) {
        super(id)

        this.time      = `00:05`
        this.break     = `00:05`
        this.longBreak = `00:05`

        this.defaultTitle = "[ ... ]"

        if (document.getElementById('pomidorka-config-form')) {
            this.config =  new comp('pomidorka-config-form', {
                pomidorkaTime : this.$pomidorkaTime,
                startTimer    : this.$startTimer,
                stopTimer     : this.$stopTimer,
                id_timer      : this.id_timer
            })
        } else {
            this.config = {
                time : this.time,
                break : this.break,
                longBreak : this.longBreak
            }
        }

        this.$pomidorkaTime.innerHTML = this.config.time
        this.$pomidorkaTitle.innerHTML = this.defaultTitle

        this.countForLongBreak = 0
    }

    async init() {
        this.id_timer = null
        this.$pomidorkaTime  = this.$el.querySelector('.pomidorka-timer__time')
        this.$pomidorkaTitle = this.$el.querySelector('.pomidorka-timer__title')
        this.$startTimer     = this.$el.querySelector('.js-btn-start')
        this.$pauseTimer     = this.$el.querySelector('.js-btn-pause')
        this.$stopTimer      = this.$el.querySelector('.js-btn-end')

        this.sound = require('../../sounds/pomodorko_sound.mp3')
        this.notification = new Audio(this.sound)

        if (!this.started) {
            this.startEventListining()
        }
    }

    onShow() {
        this.config.show()
    }

    async startEventListining() {
        this.started = true
        this.$startTimer.addEventListener('click', clickStartHandler.bind(this))
        this.$pauseTimer.addEventListener('click', clickPauseHandler.bind(this))
        this.$stopTimer.addEventListener('click', clickStopHandler.bind(this))
    }
}

async function clickStartHandler(event) {
    if (!this.isWasPause) {
        this.listElement = document.querySelector('.pomidorka-table').firstElementChild.firstElementChild
        this.listElementId = this.listElement.dataset.key
        this.listElementTitle = this.listElement.firstElementChild
        this.$pomidorkaTitle.innerHTML = this.listElementTitle.innerHTML
    }

    hideElement(this.$el.querySelector('.pause-note'))
    visibilityHandler(event.target, this.$pauseTimer)
    this.id_timer = setInterval(tickPomidorka.bind(this), 1000)
    disabledFormControls(this.config.formConfig)

    this.isWasPause = false
}
function clickPauseHandler(event) {
    this.isWasPause = true
    visibilityHandler(event.target, this.$startTimer)
    clearInterval(this.id_timer)
    showElement(this.$el.querySelector('.pause-note'))
}
function clickStopHandler() {
    this.isWasPause = false

    this.listElement = null
    this.listElementId = ''
    this.listElementTitle = ''

    hideElement(this.$el.querySelector('.pause-note'))

    visibilityHandler(this.$pauseTimer, this.$startTimer)
    clearInterval(this.id_timer)
    addValueToElement(`${this.config.time}`, this.$pomidorkaTime)
    addValueToElement(this.defaultTitle, this.$pomidorkaTitle)
    resetBlockTimer.call(this)
    enabledFormControls(this.config.formConfig)
}
async function tickPomidorka() {

    let time_list = this.$pomidorkaTime.innerHTML.split(':')
    let min = time_list[0]
    let sec = time_list[1]

    if (sec == 0) {
        if (min == 0) {
            if (!this.isBreak) {
                this.$el.classList.add('pomidorka-timer_bg-color-break')
                addValueToElement(`${this.config.break}`, this.$pomidorkaTime)
                showElement(this.$el.querySelector('.break'))

                this.isBreak = true
                this.notification.play()

                await Pomidorka.Delete(`${this.listElementId}`)
                Array.from( document.querySelector('.pomidorka-table')
                .querySelectorAll('.js-table-row')).forEach( (e) => {
                    if (e.dataset.key === this.listElementId) {
                        e.remove()
                    }
                })
                return
            }
            resetBlockTimer.call(this)

            if (++this.countForLongBreak == 4) {
                addValueToElement(`${this.config.longBreak}`, this.$pomidorkaTime)
            } else {
                addValueToElement(`${this.config.time}`, this.$pomidorkaTime)
            }

            visibilityHandler(this.$pauseTimer, this.$startTimer)
            clearInterval(this.id_timer)
            enabledFormControls(this.config.formConfig)

            this.$pomidorkaTitle.innerHTML = this.defaultTitle
            return
        }
        min--
        if (min < 10) { min = "0" + min }
        sec = 59
    } else sec--
    if (sec < 10) { sec = "0" + sec }

    addValueToElement(`${min}:${sec}`, this.$pomidorkaTime)
}

function resetBlockTimer() {
    this.isBreak = false
    if (this.$el.classList.contains('pomidorka-timer_bg-color-break')) {
        this.$el.classList.remove('pomidorka-timer_bg-color-break')
    }
    hideElement(this.$el.querySelector('.break'))
}