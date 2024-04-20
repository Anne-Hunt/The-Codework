import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostService {
    async getActiveProfilePosts(idSearch) {
        const response = await api.get(`api/profiles/${idSearch}/posts`)
        logger.log('found user posts', response.data)
        const posts = response.data.posts.map(post => new Post(post))
        AppState.posts = posts
    }

    clearingSearch() {
        throw new Error('Method not implemented.')
    }

    async searchPosts(searchQuery) {
        AppState.posts = []
        const response = await api.get(`api/posts?query=${searchQuery}`)
        logger.log('search query in post service', response.data)
        const posts = response.data.posts.map(post => new Post(post))
        AppState.postResults = posts
        AppState.newer = response.data.newer
        AppState.older = response.data.older
        AppState.totalPages = response.data.totalPages
        AppState.currentPage = response.data.page
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
        const post = new Post(postData)
        AppState.posts.push(post)
    }

    async updatePost(postData, postId) {
        const response = await api.put(`api/posts/${postId}`, postData)
        logger.log('updating data in service for post', response.data)
        // const post = new Post(response.data)
        // = AppState.posts.find(post => post.id == postId)

    }

    async trashPost(postId) {
        const response = await api.delete(`api/posts/${postId}`)
        logger.log('deleting post', response.data)
        const postIndex = AppState.posts.findIndex(post => post.id == postId)
        AppState.posts.splice(postIndex, 1)
    }

    async likePost(postId) {
        const response = await api.post(`/api/posts/${postId}/like`)
        logger.log('altering state of like on post', response.data)
    }

    async findPostById(postId) {
        AppState.activePost = null
        const response = await api.get(`api/posts/${postId}`)
        logger.log('post found', response.data)
        const post = new Post(response.data)
        AppState.activePost = post
    }

    async getPostsByPage(pageNum) {
        const response = await api.get(`api/posts?${pageNum}`)
        logger.log('getting posts by page', response.data)
        const posts = response.data.posts.map(post => new Post(post))
        AppState.posts = posts
        AppState.newer = response.data.newer
        AppState.older = response.data.older
        AppState.totalPages = response.data.totalPages
        AppState.currentPage = response.data.page
    }

}

export const postService = new PostService()