import { Worker } from "bullmq";
import { redis } from "@/lib/rate-limit/redis";
import { processDocument } from "@/worker/jobs/file-processing";
import { embedDocument } from "@/worker/jobs/embedding-generation";

new Worker("file-processing", async (job) => processDocument(job.data.documentId), { connection: redis });
new Worker("embedding-generation", async (job) => embedDocument(job.data.documentId), { connection: redis });
new Worker("agent-test-run", async () => undefined, { connection: redis });
new Worker("usage-rollup", async () => undefined, { connection: redis });

console.log("AgentFactory worker started");
