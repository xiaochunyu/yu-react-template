module.exports = {
  default: false, // excludes all rules
  MD001: true, // enables rule MD001
  MD003: { style: 'atx_closed' }, // set parameter style of rule MD003 to atx_closed
  'first-line-heading': true, // enables alias first-line-heading
  atx_closed: true // enables tag atx-closed
}

// 名称可以是default、 rule、 alias 或 tags：

// default：特殊属性，设为 true 会启用所有规则，反之设为 false 则关闭所有规则
// rule：规则名称，对应至各个规则，像是范例中的 MD001 与MD003
// alias：规则别称，对应至各个规则的别名，例如范例中的 first-line-heading 是规则 MD041 的别名
// tags：作用的标签，对应至各规则的所属标签，可以将其视为规则的群组，例如范例中的 atx_closed 包括了 MD020 与 MD021 两个规则
