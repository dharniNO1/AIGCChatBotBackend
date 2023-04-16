class Prompts {
  static generateUserInput(id) {
    return (params) => {
      console.log("logging para");
      console.log(params);
      switch (id) {
        case 1: // 周报
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
        case 2: // 小红书
          return "我要写的文案是" + params.userInput;
        case 3: // 周公解梦
          return "我梦见了" + params.userInput;
        case 4: // 海绵宝宝的神奇海螺
          return params.userInput;
        case 5: // 教师教案
          return "我的主题是：" + params.userInput;
      }
    };
  }

  static getPromptSessionMessages(id) {
    switch (id) {
      case 1: // 周报
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
      case 2: // 小红书
        return [
          {
            content:
              "我希望你能充当一个解梦者。我将给你描述我的梦，而你将根据梦中出现的符号和主题提供解释。不要提供关于梦者的个人意见或假设。只提供基于所给信息的事实性解释。如果认为我的输入不是一个梦境，那你可以拒绝我的请求，让我重新输入",
            role: "system",
          },
        ];
      case 3: // 周公解梦
        return [
          {
            content:
              "我希望你能充当一个解梦者。我将给你描述我的梦，而你将根据梦中出现的符号和主题提供解释。不要提供关于梦者的个人意见或假设。只提供基于所给信息的事实性解释。如果认为我的输入不是一个梦境，那你可以拒绝我的请求，让我重新输入",
            role: "system",
          },
        ];
      case 4: // 海绵宝宝的神奇海螺
        return [
          {
            content:
              "我想让你充当海绵宝宝的魔力海螺壳。对于我问的每一个问题，你只能用一个词来回答，或者是这些选项中的一个。也许有一天会，我不这么认为，或者再试着问一次。不要对你的答案做任何解释。",
            role: "system",
          },
        ];
      case 5: // 海绵宝宝的神奇海螺
        return [
          {
            content:
              "请帮助我编写一份教学案例，我将会提供一个主题，教学案例主要包括以下内容：教学目标，教学重点，教学难点，以及教学方法。",
            role: "system",
          },
        ];
    }
  }
}

module.exports = Prompts;
