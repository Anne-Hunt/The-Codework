import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostService {
    clearingSearch() {
        throw new Error('Method not implemented.')
    }
    searchPosts(value) {
        throw new Error('Method not implemented.')
    }
    async getPosts() {
        const response = await api.get('api/posts')
        logger.log('grabbed posts in service', response.data)
        const posts = response.data.posts.map(post => new Post(post))
        AppState.posts = posts
        AppState.newer = response.data.newer
        AppState.older = response.data.older
        AppState.totalPages = response.data.totalPages
        AppState.currentPage = response.data.page
    }

    async postPosts(postData) {
        const response = await api.post('api/posts', postData)
        logger.log('adding posts in service', response.data)
    }

}

export const postService = new PostService()