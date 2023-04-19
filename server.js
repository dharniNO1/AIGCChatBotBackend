const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const { performance } = require("perf_hooks");
const { chatModes, accountConfigs } = require("./configs/configs");
const prompts = require("./prompts/prompts");

const app = express();
app.use(cors());

app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] Incoming request: ${req.method} ${req.url}`
  );
  console.log("Incoming request body:", req.body);
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
  if (userInput === "Test") {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    res.json(
      "Test 疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试"
    );
    return;
  }

  const startTime = performance.now();
  console.debug(
    "[handleChat] sessionMessages: [%s]",
    JSON.stringify(sessionMessages)
  );
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: sessionMessages,
    temperature: 0.9,
  });
  console.log(response.data.choices);
  res.json(response.data.choices[0].message.content);

  const endTime = performance.now();
  const responseTime = endTime - startTime;
  console.log(`[handleChat] API response time: ${responseTime.toFixed(2)} ms`);
}

// ************************
// ******  REST API *******
// ************************
app.post("/api/chat", async (req, res) => {
  try {
    console.log("[/api/chat] User req body: [%s]", req.body);
    const userInput = req.body.userInput.trim();

    if (userInput === "Test") {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      res.json(
        "Test 疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试疯狂测试"
      );
      return;
    }
    const sessionMessages = [
      ...req.body.sessionMessages,
      { role: "user", content: userInput },
    ];

    await handleChat(userInput, sessionMessages, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while processing request.");
  }
});

app.post("/api/onetimeChat", express.json(), async (req, res) => {
  try {
    const userInput = req.body;
    console.log("User Input: [%s]", userInput);

    if (userInput === "Test") {
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
        content: prompts.generateUserInput(chatModeId)({ ...userInput }),
      },
    ];
    await handleChat(userInput, sessionMessages, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while processing request.");
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
