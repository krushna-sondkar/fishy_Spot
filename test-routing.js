const express = require('express');

const app = express();
const router = express.Router();
const fishRouter = express.Router();

fishRouter.get("/fish", (req, res) => res.json({ success: true, message: "Fish catalogue" }));

router.use(fishRouter);
app.use('/api', router);
app.use(router);

app.get('/healthz', (req, res) => res.json({ status: 'ok' }));

const request = require('supertest');

async function runTests() {
  console.log("Testing /api/fish...");
  const res1 = await request(app).get('/api/fish');
  console.log("/api/fish:", res1.status, res1.body);

  console.log("Testing /fish...");
  const res2 = await request(app).get('/fish');
  console.log("/fish:", res2.status, res2.body);
  
  console.log("Testing /healthz...");
  const res3 = await request(app).get('/healthz');
  console.log("/healthz:", res3.status, res3.body);
  
  console.log("Testing /api/healthz...");
  const res4 = await request(app).get('/api/healthz');
  console.log("/api/healthz:", res4.status, res4.body);
}

runTests();
