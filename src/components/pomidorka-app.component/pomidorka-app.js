import { Component } from '../../core/component'
import PomidorkaTimerComponent from '../pomidorka-timer.component/'
import PomidorkaConfigFormComponent from '../pomidorka-config-form.component/'
import PomidorkaCreateFormComponent from '../pomidorka-create-form.component/'
import PomidorkaListComponent from '../pomidorka-list.component/'
import PomidorkaEditFormComponent from '../pomidorka-edit-form.component/'
import { LoaderComponent }from '../loader.component';

export default class PomidorkaAppComponent extends Component {
    constructor(id) {
        super(id)
    }
    init() {
        const loader = new LoaderComponent('loader')
        const pomidorkaTimerComponent = new PomidorkaTimerComponent('pomidorka-timer', PomidorkaConfigFormComponent)
        const pomidorkaListComponent = new PomidorkaListComponent('pomidorka-list', { loader })
        const pomidorkaCreateFormComponent = new PomidorkaCreateFormComponent('pomidorka-create-form', pomidorkaListComponent)
       
        const pomidorkaEditFormComponent = new PomidorkaEditFormComponent('pomidorka-edit-form', pomidorkaListComponent)
       

        pomidorkaTimerComponent.show()
        pomidorkaListComponent.show()
        pomidorkaCreateFormComponent.show()
    }

    onShow() {
        super.onShow()
    }
}