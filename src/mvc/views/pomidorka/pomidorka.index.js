import { TransormSerive } from '../../../services/transform.service'
import { pomidorkaController } from '../../controllers/pomidorka.controller'

export function pomidorkaIndex(dataObj = {}) {
    const data = TransormSerive.firebaseObjToArray(dataObj)

    if (!data) {
        return [`<tr><td>А помидорок то нет ... </td></tr>`]
    }

    const html = data.reverse().map(v => {
          return `
            <tr data-key=${v.id} class="js-table-row">
                <td>${v.pomidorkatitle}</td>
                <!-- <td>${v.count}</td> -->
                <td><i class="fas fa-edit js-list-item-edit"></i></td>
                <td><i class="fas fa-trash-alt js-list-item-del"></i></td>
            </tr>`
    })
    return html
}