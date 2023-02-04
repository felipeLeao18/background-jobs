/* eslint-disable no-console */
import Queue from 'bull';
import redisConfig from '../config/redis';
import * as jobs from '../jobs';

const queues = Object.values(jobs).map((job) => {
  const jobsRaw = {
    bull: new Queue(job.key, redisConfig),
    name: job.key,
    handle: job.handle,
    options: job.options,
  };
  return jobsRaw;
});

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find((_queue) => _queue.name === name);

    return queue.bull.add(queue.name, data, queue.options);
  },
  process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.name, queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', queue.key, job.data);
        console.log(err);
      });
    });
  },
};
