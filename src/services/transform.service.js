export class TransormSerive {
    static firebaseObjToArray(firebaseData) {
        return Object.keys(firebaseData).map( key => {
            const item = firebaseData[key]
            item.id = key
            return item
        })
    }
}