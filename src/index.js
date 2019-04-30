import NavigationComponent from './components/navigation.component/'
import PomidorkaAppComponent from './components/pomidorka-app.component/'
import PlansAppComponent from './components/plans-app.component/'
import BlogAppComponent from './components/blog-app.component/'
import ChartAppComponent from './components/chart-app.component/'
import ConfigAppComponent from './components/config-app.component/'
import BugsAppComponent from './components/bugs-app.component/'

import './style/scss/index.scss'

const nav = new NavigationComponent('app-menu')


nav.registerTabs([
    {
        name : 'pomidorka',
        component : new PomidorkaAppComponent('pomidorka-space')
    },
    {
        name : 'plans',
        component: PlansAppComponent.create('plans-space')
    },
    {
        name : 'blog',
        component: BlogAppComponent.create('blog-space')
    },
    {
        name : 'chart',
        component: ChartAppComponent.create('chart-space')
    },
    {
        name : 'config',
        component: ConfigAppComponent.create('config-space')
    },
    {
        name : 'bugs',
        component: BugsAppComponent.create('bugs-space')
    },
])
// Entry Component
showEntryComponent('pomidorka')
// helpers
function showEntryComponent(name) {
    nav.tabs.find( e => e.name === name).component.show()
}