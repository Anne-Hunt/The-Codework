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
    const profile = new Account(profileData)
    const account = AppState.account
    account.bio = profile.bio
    account.class = profile.class
    account.coverImg = profile.coverImg
    account.email = profile.email
    account.github = profile.github
    account.graduated = profile.graduated
    account.linkedin = profile.linkedin
    account.name = profile.name
    account.picture = profile.picture
    account.resume = profile.resume
    account.subs = profile.subs
    profile.id = account.id
    const response = await api.put('account/', account)
    logger.log('updating profile', response.data)
    logger.log('end update', AppState.account)
  }
}

export const accountService = new AccountService()
