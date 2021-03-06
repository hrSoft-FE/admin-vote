/**
 * Created by out_xu on 17/8/10.
 */
const menus = [
  {
    'key': '/school/schoolInfo',
    'value': '校管理员信息',
    'icon': 'user',
  },
  {
    'key': '/school/joinedTeams',
    'value': '管理本校参赛队伍',
    'route': 'joinedTeams',
    'icon': 'team',
  }, {
    'key': '/school/problem',
    'value': '竞赛作品提交确认',
    'route': 'problem',
    'icon': 'team',
  }, {
    'key': '/school/problemList',
    'value': '查看竞赛题目',
    'route': 'problem',
    'icon': 'file-text',
  },
  {
    'key': '/school/schoolResult',
    'value': '查看本校队伍赛果',
    'route': 'schoolResult',
    'icon': 'bulb',
  },
  {
    'key': '/school/guide',
    'value': '用户手册',
    'icon': 'eye-o',
  },
]

export { menus }