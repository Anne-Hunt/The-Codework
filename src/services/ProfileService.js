import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfileService {

    async findUserProfile() {
        const userId = AppState.account.id
        const response = await api.get(`api/profile/${userId}`)
        logger.log('getting user associated', response.data)
        const profile = new Profile(response)
        AppState.loggedInProfile = profile
    }

    async searchProfiles(searchQuery) {
        AppState.profileResults = []
        const response = await api.get(`/api/profiles?query=${searchQuery}`)
        logger.log('finding profile ', response.data)
        const profiles = response.data.map(profile => new Profile(profile))
        AppState.profileResults = profiles
    }

    async findProfile(profileId) {
        AppState.activeProfile = null
        const response = await api.get(`api/profiles/${profileId}`)
        logger.log('found profile', response.data)
        AppState.activeProfile = new Profile(response.data)
    }

    async updateProfile(profileId, updateData) {
        const response = await api.put(`api/profiles/${profileId}`, updateData)
        logger.log('sending to profile server', updateData, profileId, response.data)
    }

}

export const profileService = new ProfileService()