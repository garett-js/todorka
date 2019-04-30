import { Component } from "../../core/component";

export default class NavigationComponent extends Component {
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
            e.classList.remove('app-menu__item_state_active')
            e.classList.remove('app-menu__item_state_disabled')
        })
        target.classList.add('app-menu__item_state_active')
        target.classList.add('app-menu__item_state_disabled')

        const activeTab = this.tabs.find(e => e.name === target.dataset.name)
        this.tabs.forEach(t => t.component.hide())

        // console.log("Активная ссылка:", activeTab)

        activeTab.component.show()
    }
}