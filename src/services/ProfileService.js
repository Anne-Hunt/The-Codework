import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfileService {

    async searchProfiles(searchQuery) {
        AppState.profileResults = []
        const response = await api.get(`/api/profiles?query=${searchQuery}`)
        logger.log('finding profile ', response.data)
        const profiles = response.data.map(profile => new Profile(profile))
        AppState.profileResults = profiles
    }

    findProfile(profileId) {
        AppState.activeProfile = null
        const id = AppState.profiles.find(profile => profile.id == profileId)
        logger.log('found profile', id)
        const profile = new Profile(id)
        AppState.activeProfile = profile
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