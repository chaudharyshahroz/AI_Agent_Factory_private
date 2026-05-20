import { Queue } from "bullmq";
import { getRedis } from "@/lib/rate-limit/redis";

const queues = new Map<string, Queue>();

function getQueue(name: string) {
  const existing = queues.get(name);
  if (existing) return existing;
  const queue = new Queue(name, { connection: getRedis() });
  queues.set(name, queue);
  return queue;
}

export const fileProcessingQueue = {
  add: (...args: Parameters<Queue["add"]>) => getQueue("file-processing").add(...args)
};

export const embeddingQueue = {
  add: (...args: Parameters<Queue["add"]>) => getQueue("embedding-generation").add(...args)
};

export const agentTestQueue = {
  add: (...args: Parameters<Queue["add"]>) => getQueue("agent-test-run").add(...args)
};

export const usageRollupQueue = {
  add: (...args: Parameters<Queue["add"]>) => getQueue("usage-rollup").add(...args)
};
