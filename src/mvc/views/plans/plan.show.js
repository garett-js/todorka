import { TransormSerive } from '../../../services/transform.service'
import { plansController } from '../../controllers/plans.controller'

export function planShow(dataObj = {}) {
    const data = TransormSerive.firebaseObjToArray(dataObj.list)

    if (!data) {
        return [`
            <div class="block-content">
                <h2>А планов то и нет ... </h2>
            </div>`]
    }
    const html =
          `
            <div class="block-content">
                <h3><a href="#">${dataObj.title}</a></h3>
                <p>${dataObj.description}</p>
                ${
                    data.reverse().map(v => {
                        return `<li>${v.titlep}</li>`
                    })
                }
                <p>${dataObj.date}</p>
            </div>`

    return html
}