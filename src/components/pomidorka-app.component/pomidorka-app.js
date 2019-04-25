import { Component } from '../../core/component'
import PomidorkaTimerComponent from '../pomidorka-timer.component/'
import PomidorkaConfigFormComponent from '../pomidorka-config-form.component/'
import PomidorkaCreateFormComponent from '../pomidorka-create-form.component/'
import PomidorkaListComponent from '../pomidorka-list.component/'

export default class PomidorkaAppComponent extends Component {
    constructor(id) {
        super(id)
    }
    init() {
        const pomidorkaTimerComponent = new PomidorkaTimerComponent('pomidorka-timer', PomidorkaConfigFormComponent)
        const pomidorkaListComponent = new PomidorkaListComponent('pomidorka-list')
        const pomidorkaCreateFormComponent = new PomidorkaCreateFormComponent('pomidorka-create-form', pomidorkaListComponent)

        pomidorkaTimerComponent.show()
        pomidorkaListComponent.show()
        pomidorkaCreateFormComponent.show()
    }

    onShow() {
        super.onShow()
    }
}