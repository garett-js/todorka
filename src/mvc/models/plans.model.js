import { config } from '../config'

class PlansModel {
    constructor(config) {
        this.config = config
    }

    init() {}

    async All() {
        try {
            const request = new Request(`${this.config.databaseURL}/plans.json`, {
                method: 'get'
            })
            return useRequest(request)
        } catch (error) {
            console.error(error);
        }
    }

    async GetById(key) {
        try {
            const request = new Request(`${this.config.databaseURL}/plans/${key}.json`, {
                method: 'get'
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

export const Plans = new PlansModel(config)