/**
 * @description janghood markdown editor
 * @author 阿怪
 * @date 2022/10/25 23:14
 * @version v1.0.0
 *
 * @name md-editor
 * @description janghood markdown editor
 *              水墨组件配色的markdown编辑器
 * @docUrl https://shuimo.janghood.com
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


export type MdEditorProps = {
  /**
   * @description module value
   * @default ''
   * @type string
   */
  modelValue?: string,
  /**
   * @description placeholder
   * @default '请输入...'
   * @type string
   */
  placeholder?: string,
  /**
   * @description readonly
   * @default false
   * @type boolean
   */
  readonly?: boolean,
  /**
   * @description md-editor options
   * @default clipboard: true, history: true, prism: true, emoji: true, tooltip: true, math: true, diagram: true
   * @type MdEditorOptions
   */
  options?: MdEditorOptions
}

export type MdEditorOptions = {
  clipboard?: boolean,
  history?: boolean,
  prism?: boolean,
  emoji?: boolean,
  tooltip?: boolean,
  math?: boolean,
  diagram?: boolean
}
