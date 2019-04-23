import NavigationComponent from './components/navigation.component/'
import PomidorkaAppComponent from './components/pomidorka-app.component/'

import './style/scss/index.scss'

const nav = new NavigationComponent('app-menu')

nav.registerTabs([
    {
        name : 'pomidorka',
        component : new PomidorkaAppComponent('pomidorka-space')
    },
    // {
    //     name : 'plans',
    //     component: PlansComponent.create('plans-space')
    // },
])
// Entry Component
showEntryComponent('pomidorka')
// helpers
function showEntryComponent(name) {
    nav.tabs.find( e => e.name === name).component.show()
}