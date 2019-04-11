import { TransormSerive } from '../../../js_services/transform.service'

export function pomidorkaIndex(dataObj = {}) {
    const data = TransormSerive.firebaseObjToArray(dataObj).reverse()
    console.log(data)

    const html = data.map(v => {
        return `<li>Количество ${v.count} | ${v.pomidorkatitle}</li>`
    })

    return html
}