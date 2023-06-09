// Example:
// {
//   id: 2, # numeration key
//   chatModeInputType: 1, # chat mode id, 1 is single input and others
//   title: "小红书文案",
//   description: "可以生成小红书文案",
//   inputTitle: "title",
//   inputSubtitle: "subtitle",
//   warningSubtitle: "warningSubtitle",
//   placeholderText: "placeholderText",
//   resultTitle: "resultTitle",
// }

const chatModes = [
  {
    id: 1,
    chatModeInputType: 1,
    title: "产品PRD文档",
    description: "为你的PRD文档提供灵感",
    inputTitle: "PRD文档生成",
    inputSubtitle: "请确保您话在200字内",
    warningSubtitle: "快写啊！老板等着呢！",
    placeholderText: "例如：用户要发送信息，用户要可以加好友",
    resultTitle: "您的PRD文档灵感：",
  },
  {
    id: 2,
    chatModeInputType: 2,
    title: "周报生成",
    description: "AI提供周报思路，产出更量化",
  },
  {
    id: 3,
    chatModeInputType: 1,
    title: "小红书文案",
    description: "快速生成小红书文案（带Emoji）",
    inputTitle: "文案关键词",
    inputSubtitle:
      "请确保输入文案的关键词，这是一次性的回答，上下文需求请到首页聊天",
    warningSubtitle: "赶紧的！",
    placeholderText: "例如：王者荣耀",
    resultTitle: "你的文案：",
  },
  {
    id: 4,
    chatModeInputType: 1,
    title: "周公解梦",
    description: "AI替你解析有趣梦境",
    inputTitle: "您昨晚梦到了什么？",
    inputSubtitle: "请确保您的梦境描述在100字内",
    warningSubtitle: "别闹，请输入解梦内容",
    placeholderText: "比如：梦见在北京蹦迪",
    resultTitle: "AI对你的梦是这么理解的：",
  },
  // {
  //   id: 5,
  //   chatModeInputType: 1,
  //   title: "海绵宝宝的神奇海螺",
  //   description: "海绵宝宝的神奇海螺",
  //   inputTitle: "我是海绵宝宝的神奇海螺，你想说什么",
  //   inputSubtitle: "请确保您输入的在100字内",
  //   warningSubtitle: "请输入内容",
  //   placeholderText: "比如：阿爸阿爸阿爸",
  //   resultTitle: "神奇海螺表示：",
  // },
  {
    id: 6,
    chatModeInputType: 1,
    title: "教师教案",
    description: "给你的教学提供更多灵感",
    inputTitle: "您想要什么主题的教案",
    inputSubtitle: "请输入主题",
    warningSubtitle: "请输入主题",
    placeholderText: "比如：汉服文化、做时间的主任",
    resultTitle: "您的教案",
  },
  {
    id: 7,
    chatModeInputType: 1,
    title: "旅行计划",
    description: "制定旅行方案，推荐旅行景点和规划",
    inputTitle: "制定旅行计划",
    inputSubtitle: "说吧你想去哪里玩？预算多少？",
    warningSubtitle: "别闹，告诉我你想去哪玩？",
    placeholderText: "比如：我想去三亚，只花3000块",
    resultTitle: "你的旅行计划",
  },
  {
    id: 8,
    chatModeInputType: 1,
    title: "雅思写作考官",
    description: "AI模拟考官打分",
    inputTitle: "雅思作文",
    inputSubtitle: "请输入你的雅思作文",
    warningSubtitle: "别闹，输入你的满分作文！",
    placeholderText: "比如：Today is Sunday...",
    resultTitle: "AI对你的文章评分",
  },
  {
    id: 9,
    chatModeInputType: 1,
    title: "宝宝的检讨书",
    description: "救命用的",
    inputTitle: "你犯什么错了？",
    inputSubtitle: "简单说说发生了什么",
    warningSubtitle: "快说！你犯什么错了？",
    placeholderText: "比如：我今天弄坏了宝宝的化妆品",
    resultTitle: "你的忏悔书",
  },
];

const accountConfigs = {
  initialSubmissionCount: 50,
  initialExpiryDate: null,
  initialIsVIP: false,
};

module.exports = {
  chatModes,
  accountConfigs,
};
