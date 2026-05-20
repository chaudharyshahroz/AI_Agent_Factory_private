import { Worker } from "bullmq";
import { getRedis } from "@/lib/rate-limit/redis";
import { processDocument } from "@/worker/jobs/file-processing";
import { embedDocument } from "@/worker/jobs/embedding-generation";

new Worker("file-processing", async (job) => processDocument(job.data.documentId), { connection: getRedis() });
new Worker("embedding-generation", async (job) => embedDocument(job.data.documentId), { connection: getRedis() });
new Worker("agent-test-run", async () => undefined, { connection: getRedis() });
new Worker("usage-rollup", async () => undefined, { connection: getRedis() });

console.log("AgentFactory worker started");
