import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /** @type {{name, picture, id}} user info from Auth0*/
  user: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  posts: [],
  profiles: [],
  paids: [],
  activeProfile: null,
  activeProfilePosts: [],
  activePost: null,
  currentPage: null,
  totalPages: null,
  older: null,
  newer: null,
  searchTerms: null,
  profileResults: [],
  postResults: []
})
