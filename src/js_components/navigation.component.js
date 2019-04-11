import { Component } from "../js_core/component";

export class NavigationComponent extends Component {
    constructor(id) {
        super(id)
        this.tabs = []
    }

    init() {
        this.$el.addEventListener('click', tabClickHandler.bind(this))
    }

    registerTabs(tabs) {
        this.tabs = tabs
    }
}
// private
function  tabClickHandler(event) {
    event.preventDefault()

    let target = event.target
    target = target.closest('li') // клик по вложенным элементам кинуть на родителя

    if (target && target.classList.contains('js-tab')) {

        Array.from(this.$el.querySelectorAll('.js-tab')).forEach( (e) => {
            e.classList.remove('active')
            e.classList.remove('disabled-menu-item')
        })
        target.classList.add('active')
        target.classList.add('disabled-menu-item')

        const activeTab = this.tabs.find(e => e.name === target.dataset.name)
        this.tabs.forEach(t => t.component.hide())

        console.log("Активная ссылка:", activeTab);

        activeTab.component.show()
    }


}