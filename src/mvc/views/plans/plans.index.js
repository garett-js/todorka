import { TransormSerive } from '../../../services/transform.service'
import { plansController } from '../../controllers/plans.controller'

export function plansIndex(dataObj = {}) {
    const data = TransormSerive.firebaseObjToArray(dataObj)

    if (!data) {
        return [`
            <div class="block-content">
                <h2>А планов то и нет ... </h2>
            </div>`]
    }
    const html = data.reverse().map(v => {
          return `
            <div class="block-content">
                <h3><a href="#">${v.title}</a></h3>
                <p>${v.description}</p>
                <p>${v.date}</p>
            </div>`
    })
    return html
}