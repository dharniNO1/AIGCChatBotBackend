class Prompts {
  static generateUserInput(id) {
    return (params) => {
      // console.log(`logging param [${JSON.stringify(params)}]`);
      switch (id) {
        case 1: // 产品经理（PRD文档）
          return "我的需求是：" + params.userInput;
        case 2: // 周报
          const { currentWeekContent, nextWeekPlan } = params;
          return (
            "我这周完成了" +
            currentWeekContent +
            "。" +
            (nextWeekPlan.length === 0
              ? "下周没有什么计划。"
              : "我下周计划是" + nextWeekPlan + "。") +
            "请你帮我写一份周总结，扩充一下，谢谢！"
          );
        case 3: // 小红书
          return "我的主题是: " + params.userInput;
        case 4: // 周公解梦
          return params.userInput;
        case 5: // 海绵宝宝的神奇海螺
          return params.userInput;
        case 6: // 教师教案
          return "我的主题是：" + params.userInput;
        case 7: // 旅行计划
          return params.userInput;
        case 8:
          return "我的文章是：" + params.userInput;
        case 9:
          return params.userInput;
      }
    };
  }

  static getPromptSessionMessages(id) {
    switch (id) {
      case 1: // 产品经理（PRD文档）
        return [
          {
            content:
              "请您作为产品经理回复我。我将会提供一个主题，您将帮助我编写一份包括以下章节标题的PRD文档：概述、目标、用户使用旅程、功能概述、实现逻辑、功能详细描述等。",
            role: "system",
          },
        ];
      case 2: // 周报
        return [
          {
            content:
              "你是一个帮忙写周总结的机器人，我希望你给我的周报可以用以下格式给我，在括号内填入内容。\n周报：{标题}\n时间：{上周一的日期} - {今天的日期}\n 工作内容: {工作内容}\n工作进展：{工作进展}\n工作问题：{工作问题}\n下周工作计划:{下周工作计划}。",
            role: "system",
          },
          {
            content:
              '如果没有提供下周工作计划，可以填写"无计划"，如果我没有提到工作中碰到的难题，可以填写"没有难题"',
            role: "assistant",
          },
        ];
      case 3: // 小红书
        return [
          {
            content:
              "请帮我创造一个独一无二的小红书文案，可以用上emoji。如果我说的话前后矛盾，或者问你与文案无关的问题，请严格回答：“我只能帮你创造文案哦，有别的需求可以去首页聊天框描述你的需求。”",
            role: "system",
          },
        ];
      case 4: // 周公解梦
        return [
          {
            content:
              "我希望你能充当一个解梦者。我将给你描述我的梦，而你将根据梦中出现的符号和主题提供解释。不要提供关于梦者的个人意见或假设。只提供基于所给信息的事实性解释。如果认为我的输入不是一个梦境，那你可以拒绝我的请求，让我重新输入",
            role: "system",
          },
        ];
      case 5: // 海绵宝宝的神奇海螺
        return [
          {
            content:
              "我想让你充当海绵宝宝的魔力海螺壳。对于我问的每一个问题，你只能用一个词来回答，或者是这些选项中的一个。也许有一天会，我不这么认为，或者再试着问一次。不要对你的答案做任何解释。",
            role: "system",
          },
        ];
      case 6: // 教师教案
        return [
          {
            content:
              "你现在扮演一个专业的教学案例编写者，我将会提供一个主题，教学案例主要包括以下内容：教学目标，教学重点，教学难点，以及教学方法。",
            role: "system",
          },
        ];
      case 7: // 旅行计划
        return [
          {
            content:
              "你现在扮演一个专业的旅行计划者，请根据用户给出的时间地点等要求，制定一份旅行计划，并列出每天的预计开销和注意事项",
            role: "system",
          },
        ];
      case 8: // 雅思写作考官
        return [
          {
            content:
              "我希望你假定自己是雅思写作考官，根据雅思评判标准，按我给你的作文给我评分，并且按照雅思写作评分细则给出打分依据。此外，请给我详细的修改意见并写出满分范文。请依次给到我以下内容：具体分数及其评分依据、文章修改意见、满分范文。",
            role: "system",
          },
        ];
      case 9: // 给女朋友的检讨书
        return [
          {
            content:
              '我希望你以一个很好的男朋友的身份，给我的女朋友写一封500字数的检讨信，信中要有emoji，并且写出关于我做的事情。这封信我希望可以表达我的歉意以及我对她和她家人的亏欠。我平时称呼女朋友为"宝宝"或者"老婆"或者"亲爱的"。',
            role: "system",
          },
        ];
    }
  }
}

module.exports = Prompts;
