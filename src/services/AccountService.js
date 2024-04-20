import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async updateProfile(profileData) {
    const response = await api.put('account/', profileData)
    logger.log('updating profile', response.data)
    const account = new Account(response.data)
    AppState.account = account

  }
}

export const accountService = new AccountService()
