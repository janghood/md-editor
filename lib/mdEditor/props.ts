/**
 * @description md-editor props
 * @author 阿怪
 * @date 2022/10/25 23:13
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { WCOPO } from "../../types/dependence";
import { MdEditorProps } from "./MdEditorProps";


export const props: WCOPO<MdEditorProps> = {
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '请输入...' },
  readonly: { type: Boolean, default: false },
  options: {
    type: Object, default: () => ({
      clipboard: true, history: true, prism: true, emoji: true, tooltip: true, math: true, diagram: true,
    })
  }
}
