import { DateTime, Interval } from "luxon"

export class Post {
    constructor(data) {
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
        this.creator = data.creator
        this.createdAt = new Date(data.createdAt) || new Date()
        this.updatedAt = new Date(data.updatedAt) || new Date()
        this.id = data.id
    }

    get LikeCount() {
        let count = (this.likeIds.length) / 1
        let num = count += 1
        return `${num}`
    }

    get DateFix() {
        let dateCreated = new Date(this.createdAt).toLocaleString(DateTime.DATE_SHORT)
        return `${dateCreated}`
    }

    get IntervalFix() {
        const start = this.createdAt
        const duration = DateTime.now()
        const interval = Interval.after(start, duration)
        return `${interval}`
    }
}

// {"body":{"type":"String","required":true,"maxLength":5000},"imgUrl":{"type":"String","maxLength":500},"creatorId":{"type":"SchemaObjectId","required":true,"ref":"Account"},"likeIds":[{"type":"SchemaObjectId","ref":"Account"}]}