import { Queue } from "bullmq";
import { redis } from "@/lib/rate-limit/redis";

export const fileProcessingQueue = new Queue("file-processing", { connection: redis });
export const embeddingQueue = new Queue("embedding-generation", { connection: redis });
export const agentTestQueue = new Queue("agent-test-run", { connection: redis });
export const usageRollupQueue = new Queue("usage-rollup", { connection: redis });
