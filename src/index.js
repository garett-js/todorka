// section import js
import { NavigationComponent }     from './js_components/navigation.component'
import { PomidorkaTimerComponent } from './js_components/pomidorka.component'
import { PlansComponent }          from './js_components/plans.component'
// section import style
import './style/css/index.css'

const nav = new NavigationComponent('app-menu')

nav.registerTabs([
    {
        name : 'pomidorka',
        component : PomidorkaTimerComponent.create('pomidorka')
    },
    {
        name : 'plans',
        component: PlansComponent.create('plans')
    },
])

// Entry Component
showEntryComponent('pomidorka')

console.log('App Go!');

// helpers
function showEntryComponent(name) {
    nav.tabs.find( e => e.name === name).component.show()
}