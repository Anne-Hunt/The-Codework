import { AppState } from "../AppState.js"
import { Paid } from "../models/Paid.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PaidService {
    async getPaids() {
        const response = await api.get('api/ads')
        logger.log('get paids in service', response.data)
        const paids = response.data.map(paid => new Paid(paid.data))
        AppState.paids = paids
    }
}

export const paidService = new PaidService()