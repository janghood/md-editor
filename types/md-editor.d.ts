/**
 * @description janghood markdown editor
 * @author 阿怪
 * @date 2022/10/25 22:55
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import editor from '../lib/mdEditor/MdEditor';
import { App } from "vue";

export declare const MdEditor: typeof editor;

export interface JanghoodMdEditor {
  install: (app: App) => App;
}

export function createMdEditor(): JanghoodMdEditor
