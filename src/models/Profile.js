
export class Profile {
    constructor(data) {
        this.subs = data.posts.creator.subs
        this.email = data.posts.creator.email
        this.name = data.posts.creator.name
        this.picture = data.posts.creator.picture
        this.bio = data.posts.creator.bio
        this.coverImg = data.posts.creator.coverImg
        this.github = data.posts.creator.github
        this.linkedin = data.posts.creator.linkedin
        this.resume = data.posts.creator.resume
        this.graduated = data.posts.creator.graduated
        this.class = data.posts.creator.class
        this.id = data.posts.creator.id
    }
}





// {"subs":[{"type":"String","unique":true}],"email":{"type":"String","lowercase":true,"unique":true,"maxLength":500},"name":{"type":"String","required":true,"maxLength":100},"picture":{"type":"String","default":"","maxLength":500},"bio":{"type":"String","default":"","maxLength":1000},"coverImg":{"type":"String","default":"https://images.unsplash.com/photo-1586829135343-132950070391?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80","maxLength":500},"github":{"type":"String","default":"","maxLength":500},"linkedin":{"type":"String","default":"","maxLength":500},"resume":{"type":"String","default":"","maxLength":500},"class":{"type":"String","default":"","maxLength":100},"graduated":{"type":"Boolean","default":false}}