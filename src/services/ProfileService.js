import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfileService {
    async getProfiles() {
        const response = await api.get('api/profiles')
        logger.log('got profiles in service', response.data)
        const profiles = response.data.map(profile => new Profile(profile.data))
        AppState.profiles = profiles
    }

}

export const profileService = new ProfileService()