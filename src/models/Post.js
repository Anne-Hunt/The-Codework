

export class Post {
    constructor(data) {
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
        this.creator = data.creator
        this.createdAt = new Date(data.createdAt).toLocaleDateString
        this.updatedAt = new Date(data.updatedAt).toLocaleDateString
    }

    get LikeCount() {
        let count = (this.likeIds.length) / 1
        let num = count += 1
        return `${num}`
    }
}

// {"body":{"type":"String","required":true,"maxLength":5000},"imgUrl":{"type":"String","maxLength":500},"creatorId":{"type":"SchemaObjectId","required":true,"ref":"Account"},"likeIds":[{"type":"SchemaObjectId","ref":"Account"}]}