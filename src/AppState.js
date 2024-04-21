import { reactive } from 'vue'
import { Profile } from './models/Profile.js'
import { Post } from './models/Post.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /** @type {{name, picture, id}} user info from Auth0*/
  user: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  posts: [],
  profiles: [],
  paids: [],
  /**@type {Profile} */
  activeProfile: null,
  /**@type {Profile} */
  loggedInProfile: null,
  activeProfilePosts: [],
  activePost: null,
  currentPage: null,
  totalPages: null,
  searchTerms: null,
  profileResults: [],
  postResults: []
})
