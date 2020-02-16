import Queue from 'bull';
import redisConfig from '../config/redis';

import * as jobs from '../app/jobs';

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
}));

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find(q => q.name === name);

    return queue.bull.add(data);
  },
  process() {
    return this.queues.forEach(q => {
      q.bull.process(q.handle);

      q.bull.on('failed', (job, err) => {
        console.log('Job failed', job.name, job.data);
        console.log(err);
      });
    });
  },
};

// import OrderRegistrationMail from '../app/jobs/OrderRegistrationMail';

// const mailQueue = new Queue(OrderRegistrationMail.key, redisConfig);

// mailQueue.on('failed', (job, err) => {
//   console.log('Job failed', job.name, job.data);
//   console.log(err);
// });

// export default mailQueue;
