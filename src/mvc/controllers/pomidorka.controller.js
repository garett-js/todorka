import { Pomidorka }      from '../models/pomidorka.model'
import { pomidorkaIndex } from '../views/pomidorka/pomidorka.index'

class PomidorkaController {
    constructor() {
        this.hello = "PomidorkaController.Constructor"
        this.init()
    }

    init() {
        console.log(this.hello)
    }

    static make() {
        return new PomidorkaController()
    }

    async index() {
        const pomidorkos = await Pomidorka.All() // return array
        return view(pomidorkaIndex, pomidorkos) // return html
    }

    async create(data) {
        await Pomidorka.Store(data)
    }

    async update(data, key) {
        await Pomidorka.Update(data, key)
    }

    async delete(key) {
        await Pomidorka.Delete(key)
    }
}

function view(nameview, data) {
    return nameview(data)
}

export const pomidorkaController = PomidorkaController.make()