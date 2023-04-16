const chatModes = [
  { id: 1, title: '周报生成', description: 'AI提供周报思路，产出更量化' },
  { id: 2, title: '小红书文案', description: '可以生成小红书文案' },
  { id: 3, title: '周公解梦', description: '周公解梦' },
  { id: 4, title: '海绵宝宝的神奇海螺', description: '海绵宝宝的神奇海螺' },
  { id: 5, title: '教师教案', description: '教学案例，我将会提供一个主题' },
]

const accountConfigs = {
  initialSubmissionCount: 55,
}

module.exports = {
  chatModes,
  accountConfigs,
}
