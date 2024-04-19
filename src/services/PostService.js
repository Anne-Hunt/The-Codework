import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostService {
    async getPosts() {
        const response = await api.get('api/posts')
        logger.log('grabbed posts in service', response.data)
        const posts = response.data.map(post => new Post(post.data))
        AppState.posts = posts
    }

}

export const postService = new PostService()