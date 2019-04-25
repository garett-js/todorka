import { TransormSerive } from '../../../services/transform.service'
import { pomidorkaController } from '../../controllers/pomidorka.controller'

export function pomidorkaIndex(dataObj = {}) {
    const data = TransormSerive.firebaseObjToArray(dataObj).reverse()
    console.log(data)

    const html = data.map(v => {
          return `
            <tr data-key=${v.id}>
                <td>${v.pomidorkatitle}</td>
                <td>${v.count}</td>
                <td><a href="#">Редактировать</a></td>
                <td><a href="#" class="js-list-item-del">Удалить</a></td>
            </tr>`
    })
    return html
}