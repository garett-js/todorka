import { Plans }      from '../models/plans.model'
import { plansIndex } from '../views/plans/plans.index'
import { planShow } from '../views/plans/plan.show'

class PlansController {
    constructor() {
        this.init()
    }

    init() {
    }

    static make() {
        return new PlansController()
    }

    async index() {
        const plans = await Plans.All() // return array
        return view(plansIndex, plans) // return html
    }

    async show(key) {
        const plan = await Plans.GetById(key)
        return view(planShow, plan) // return html
    }
}

function view(nameview, data) {
    return nameview(data)
}

export const plansController = PlansController.make()