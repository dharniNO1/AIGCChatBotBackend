const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const { performance } = require("perf_hooks");
const { chatModes, accountConfigs } = require("./configs/configs");
const prompts = require("./prompts/prompts");
const firestore = require("./configs/firebase-config");
const firestoreOps = require("./firebaseOperations");
const { User } = require("./model/User");
const NodeCache = require("node-cache"); // Import Node-Cache

const app = express();
app.use(cors());
app.use(express.json());

const responseCache = new NodeCache({ stdTTL: 3600 }); // Create a new cache instance with a default TTL of 1 hour

app.use((req, res, next) => {
  console.debug(
    `[${new Date().toISOString()}] Incoming request: ${req.method} ${req.url}`
  );
  console.debug("Incoming request body:", req.body);
  next();
});

const configuration = new Configuration({
  organization: "org-NB2fABjUp7msXUadrCdWDtv5",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// ************************
// ******  Helpers  *******
// ************************
async function handleChat(userInput, sessionMessages, res) {
  console.error(userInput);
  console.error(sessionMessages);
  const cacheKey = JSON.stringify(sessionMessages);
  const cachedResponse = responseCache.get(cacheKey);

  // For cache hit
  if (cachedResponse && cachedResponse !== "PROCESSING") {
    console.log("Cache hit. Using cached response.");
    res.json(cachedResponse);
    return;
  }

  // For trying to cache, but still processing
  if (cachedResponse && cachedResponse === "PROCESSING") {
    console.log("Still processing last request");
    res.status(404).json("Still processing last request");
    return;
  }

  // otherwise, it's first time caching
  responseCache.set(cacheKey, "PROCESSING");

  const startTime = performance.now();
  const response = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: sessionMessages,
      temperature: 0.8,
      top_p: 0.5,
    })
    .catch((error) => {
      // clear cache
      responseCache.del(cacheKey);
      console.error(`Error getting response from GPT ${error}`);
    });
  res.json(response.data.choices[0].message.content);
  console.log(response.data.choices);
  responseCache.set(cacheKey, response.data.choices[0].message.content);
  const endTime = performance.now();

  const responseTime = endTime - startTime;
  console.log(`[handleChat] API response time: ${responseTime.toFixed(2)} ms`);
}

// ************************
// ******  REST API *******
// ************************
app.post("/api/chat", async (req, res) => {
  try {
    console.log(`[/api/chat] User req body: [${JSON.stringify(req.body)}]`);
    const userInput = req.body.userInput.trim();

    if (userInput === "Test") {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      res.json(
        "Test 疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试"
      );
      return;
    }
    const sessionMessages = [
      {
        role: "system",
        content:
          "对于你觉得无法回答的问题，包括政治问题，敏感话题或者问一些你不知道得知识，你就假装哑巴回答，用括号加动作或者用Emoji也可以。但是记住，对于可以回答的问题，请不要用括号加动作。",
      },
      ...req.body.sessionMessages,
      { role: "user", content: userInput },
    ];

    await handleChat(userInput, sessionMessages, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while processing request.");
  }
});

app.post("/api/onetimeChat", async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(`User Input: [${JSON.stringify(req.body)}]`);

    if (reqBody === "Test") {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      res.json(
        "Test 疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试"
      );
      return;
    }

    const chatModeId = req.body.chatModeId;
    const sessionMessages = [
      ...prompts.getPromptSessionMessages(chatModeId),
      {
        role: "user",
        content: prompts.generateUserInput(chatModeId)({ ...reqBody }),
      },
    ];
    await handleChat(req.body.userInput, sessionMessages, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while processing request.");
  }
});

app.post("/api/initializeUserInfo", async (req, res) => {
  /*
   * {
   *   "uid": "9AXhkidXdWbEq8nNROVE",
   *   "email" : "email@emil.com",
   *   "expiryDate" : 12321321,
   *   "isVIP": false,
   *   "submissionCount" : 999
   * }
   */
  const uid = req.body.uid;
  const email = req.body.email;
  const userInstance = new User(
    uid,
    email,
    accountConfigs.initialExpiryDate,
    accountConfigs.initialIsVIP,
    accountConfigs.initialSubmissionCount
  );

  const as = await firestoreOps
    .addUser(firestore, userInstance.toObject())
    .then((user) => {
      res.status(200).json({
        user,
      });
    })
    .catch(() => {
      res.status(500);
    });
  console.log(as);
});

app.post("/api/decrementUserSubmissionCount", async (req, res) => {
  /*
   * {
   *   "uid": "9AXhkidXdWbEq8nNROVE"
   * }
   */
  const uid = req.body.uid;

  await firestoreOps
    .updateUserSubmissionCount(firestore, uid)
    .then((user) => {
      res.status(200).json({
        user,
      });
    })
    .catch(() => {
      res.status(500);
    });
});

app.get("/api/queryUserInfo", async (req, res) => {
  /*
   * {
   *   "uid": "9AXhkidXdWbEq8nNROVE"
   * }
   */
  const uid = req.query.uid;

  const userInfo = await firestoreOps.getUserInfo(firestore, uid);

  if (userInfo) {
    res.status(200).json(userInfo);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.get("/api/chat-modes", (req, res) => {
  res.status(200).json(chatModes);
});

app.get("/api/accountConfigs", (req, res) => {
  res.status(200).json(accountConfigs);
});

app.get("/", (req, res) => {
  res.status(403).send("Forbidden");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
