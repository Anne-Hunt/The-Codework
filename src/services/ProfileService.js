import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfileService {
    searchProfiles(value) {
        throw new Error('Method not implemented.')
    }

    findProfile(profileId) {
        AppState.activeProfile = null
        const id = AppState.profiles.find(profile => profile.id == profileId)
        logger.log('found profile', id)
        AppState.activeProfile = new Profile(id)
    }

    async getProfiles() {
        AppState.profiles = []
        const response = await api.get('api/posts')
        logger.log('got profiles in service', response.data)
        const profileArray = []
        for (let i = 0; i < response.data.posts.length; i++) {
            profileArray.push(response.data.posts[i].creator)
            // logger.log(profileArray)
        }
        AppState.profiles = profileArray
        logger.log('finished', AppState.profiles)
    }

}

export const profileService = new ProfileService()