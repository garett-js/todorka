// section import js
import { NavigationComponent }     from './js_components/navigation.component'
import { PomidorkaTimerComponent } from './js_components/pomidorka.component'
import { PlansComponent }          from './js_components/plans.component'

// section import style
// import './style/css/index.css'
import './style/scss/index.scss'

const nav = new NavigationComponent('.app-menu')
console.log(nav)


nav.registerTabs([
    {
        name : 'pomidorka',
        component : PomidorkaTimerComponent.create('.pomidorka-space')
    },
    {
        name : 'plans',
        component: PlansComponent.create('.plans-space')
    },
])

// Entry Component
showEntryComponent('pomidorka')

console.log('App Go!');

// helpers
function showEntryComponent(name) {
    nav.tabs.find( e => e.name === name).component.show()
}