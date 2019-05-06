import { Plans }      from '../models/plans.model'
import { plansIndex } from '../views/plans/plans.index'

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

    // async create(data) {
    //     await Pomidorka.Store(data)
    // }

    // async update(data, key) {
    //     await Pomidorka.Update(data, key)
    // }

    // async delete(key) {
    //     await Pomidorka.Delete(key)
    // }
}

function view(nameview, data) {
    return nameview(data)
}

export const plansController = PlansController.make()