import { Component } from '../../core/component'
import { enabledFormControls, disabledFormControls, hideElement, showElement, visibilityHandler ,addValueToElement} from '../../libs/help-functions'

export default class PomidorkaTimerComponent extends Component {
    constructor(id, comp) {
        super(id)
       
        this.time      = `00:05`
        this.break     = `00:05`
        this.longBreak = `00:05`

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
    }

    init() {
        this.id_timer = null
        // Get block POMIDORKA TIMER       
        this.$pomidorkaTime  = this.$el.querySelector('.pomidorka-timer__time')
        this.$pomidorkaTitle = this.$el.querySelector('.pomidorka-timer__title')
        this.$startTimer     = this.$el.querySelector('.js-btn-start')
        this.$pauseTimer     = this.$el.querySelector('.js-btn-pause')
        this.$stopTimer      = this.$el.querySelector('.js-btn-end')

        if (!this.started) {
            this.startEventListining()
        }
    }

    onShow() {}

    startEventListining() {
        this.started = true
        this.$startTimer.addEventListener('click', clickStartHandler.bind(this))
        this.$pauseTimer.addEventListener('click', clickPauseHandler.bind(this))
        this.$stopTimer.addEventListener('click', clickStopHandler.bind(this))
    }
}

function clickStartHandler(event) {
    visibilityHandler(event.target, this.$pauseTimer)
    this.id_timer = setInterval(tickPomidorka.bind(this), 1000)
    disabledFormControls(this.config.formConfig)
}
function clickPauseHandler(event) {
    visibilityHandler(event.target, this.$startTimer)
    clearInterval(this.id_timer)
}
function clickStopHandler() {
    visibilityHandler(this.$pauseTimer, this.$startTimer)
    clearInterval(this.id_timer)
    addValueToElement(`${this.config.time}`, this.$pomidorkaTime)
    resetBlockTimer.call(this)
    enabledFormControls(this.config.formConfig)
}
function tickPomidorka() {
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
                return
            }
            resetBlockTimer.call(this) 
            addValueToElement(`${this.config.time}`, this.$pomidorkaTime)
            visibilityHandler(this.$pauseTimer, this.$startTimer)
            clearInterval(this.id_timer)
            enabledFormControls(this.config.formConfig)
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