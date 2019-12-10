import Bee from 'bee-queue'

import CancellationMail from '../app/jobs/CancellationMail'
import redisConfig from '../config/redis'

class Queue {
    constructor() {
        this.jobs = [CancellationMail]
        this.queues = {}

        this.init()
    }

    init() {
        this.jobs.forEach(({ key, handle }) => {
            this.queues[key] = {
                bee: new Bee(key, {
                    redis: redisConfig
                }),
                handle
            }
        })
    }

    add(queue, job) {
        return this.queues[queue].bee.createJob(job).save()
    }

    processQueue() {
        this.jobs.forEach(job => {
            const { bee, handle } = this.queues[job.key]

            bee.process(handle)
        })
    }
}

export default new Queue()