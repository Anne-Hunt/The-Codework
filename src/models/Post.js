

export class Post {
    constructor(data) {
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
    }
}

// {"body":{"type":"String","required":true,"maxLength":5000},"imgUrl":{"type":"String","maxLength":500},"creatorId":{"type":"SchemaObjectId","required":true,"ref":"Account"},"likeIds":[{"type":"SchemaObjectId","ref":"Account"}]}