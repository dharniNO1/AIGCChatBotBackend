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
    title: "产品经理（PRD文档）",
    description: "快速生成PRD文档内容，为你提供灵感",
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
  // {
  //   id: 3,
  //   chatModeInputType: 1,
  //   title: "小红书文案",
  //   description: "可以生成小红书文案",
  //   inputTitle: "title",
  //   inputSubtitle: "subtitle",
  //   warningSubtitle: "warningSubtitle",
  //   placeholderText: "placeholderText",
  //   resultTitle: "resultTitle",
  // },
  {
    id: 4,
    chatModeInputType: 1,
    title: "周公解梦",
    description: "周公解梦",
    inputTitle: "您昨晚梦到了什么？",
    inputSubtitle: "请确保您的梦境描述在100字内",
    warningSubtitle: "别闹，请输入解梦内容",
    placeholderText: "比如：我昨天梦见在北京蹦迪",
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
    description: "教学案例，我将会提供一个主题",
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
    description: "帮你制定大概得旅行计划，推荐旅行景点",
    inputTitle: "制定旅行计划",
    inputSubtitle: "说吧你想去哪里玩？预算多少？",
    warningSubtitle: "别闹，告诉我你想去哪玩？",
    placeholderText: "比如：我想去三亚，只花3000块",
    resultTitle: "你的旅行计划",
  },
];

const accountConfigs = {
  initialSubmissionCount: 55,
};

module.exports = {
  chatModes,
  accountConfigs,
};
