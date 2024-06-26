import { AppState } from "../AppState.js"
import { Paid } from "../models/Paid.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PaidService {
    async getPaids() {
        const response = await api.get('api/ads')
        logger.log('get paids in service', response.data)
        const paids = response.data.map(paid => new Paid(paid))
        AppState.paids = paids
    }

    async postPaids(paid) {
        const response = await api.post('api/ads', paid)
        logger.log('sending paid to db', response.data)
    }
}

export const paidService = new PaidService()