import { TransormSerive } from '../../../services/transform.service'
import { plansController } from '../../controllers/plans.controller'

export function planShow(dataObj = {}) {
    const data = TransormSerive.firebaseObjToArray(dataObj.list)

    if (!data) {
        return [`
            <div>
                <h2>А планов то и нет ... </h2>
            </div>`]
    }
    const html =
          `
            <div">
                <h3>${dataObj.title}</h3>
                <p>${dataObj.description}</p>
                <table>
                ${
                    data.map((v,i) => {
                        return `
                        <tr data-key=${v.id}>
                            <td class="count_plan">${++i}</td>
                            <td class="title_plan">${v.titlep}</td>
                            <td class="button_plan"><button class="js-btn-add-pomidorka">К помидоркам</button></td>
                        </tr>`
                    }).join(' ')
                }
                </table>
                <p>${dataObj.date}</p>

                <button class="btn js-btn-close">Закрыть</button>
            </div>
            `

    return html
}