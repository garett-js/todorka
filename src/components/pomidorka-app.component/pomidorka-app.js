import { Component } from '../../core/component'
import PomidorkaTimerComponent from '../pomidorka-timer.component/'
import PomidorkaConfigFormComponent from '../pomidorka-config-form.component/'

export default class PomidorkaAppComponent extends Component {
    constructor(id) {
        super(id)
    }
    init() {
        const pomidorkaTimerComponent = new PomidorkaTimerComponent('pomidorka-timer', PomidorkaConfigFormComponent)
    }

    onShow() {
        super.onShow()
    }
}