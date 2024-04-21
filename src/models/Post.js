

export class Post {
    constructor(data) {
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
        this.creator = data.creator
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
    }

    get LikeCount() {
        let count = (this.likeIds.length) / 1
        let num = count += 1
        return `${num}`
    }

    get Date() {
        const chosenDate = this.createdAt != this.updatedAt ? this.updatedAt : this.createdAt
        const oldDate = new Date(chosenDate)
        const currentTime = new Date()
        const timeElapsed = currentTime - oldDate
        return `${chosenDate}`
    }
}

// {"body":{"type":"String","required":true,"maxLength":5000},"imgUrl":{"type":"String","maxLength":500},"creatorId":{"type":"SchemaObjectId","required":true,"ref":"Account"},"likeIds":[{"type":"SchemaObjectId","ref":"Account"}]}