import { config } from '../config'

class PomidorkaModel {
    constructor(config) {
        this.config = config
    }

    init() {}

    async All() {
        try {
            const request = new Request(`${this.config.databaseURL}/pomidorkos.json`, {
                method: 'get'
            })
            return useRequest(request)
        } catch (error) {
            console.error(error);
        }
    }

    async Store(pomidorka) {
        try {
            const request = new Request(`${this.config.databaseURL}/pomidorkos.json`, {
                method: 'post',
                body: JSON.stringify(pomidorka)
            })
            return useRequest(request)
        } catch (error) {
            console.error(error);
        }
    }

    async Update(pomidorka, key) {
        try {
            const request = new Request(`${this.config.databaseURL}/pomidorkos/${key}.json`, {
                method: 'put',
                body: JSON.stringify(pomidorka)
            })
            return useRequest(request)
        } catch (error) {
            console.error(error);
        }
    }

    async Delete(key) {
        try {
            const request = new Request(`${this.config.databaseURL}/pomidorkos/${key}.json`, {
                method: 'delete'
            })
            return useRequest(request)
        } catch (error) {
            console.error(error);
        }
    }
}

async function useRequest(request) {
    const response = await fetch(request)
    return response.json()
}

export const Pomidorka = new PomidorkaModel(config)