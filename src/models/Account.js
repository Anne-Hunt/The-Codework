export class Account {
  constructor(data) {
    this.id = data.id || data._id
    this.subs = data.subs
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.bio = data.bio
    this.coverImg = data.coverImg
    this.github = data.github
    this.linkedin = data.linkedin
    this.resume = data.resume
    this.graduated = data.graduated
    this.class = data.class
    // TODO add additional properties if needed
  }
}
