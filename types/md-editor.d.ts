/**
 * @description janghood markdown editor
 * @author 阿怪
 * @date 2022/10/25 22:55
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import editor from '../lib/mdEditor/MMdEditor';
import { App } from "vue";

export declare const MMdEditor: typeof editor;

export interface JanghoodMdEditor {
  install: (app: App) => App;
}

export function createMMdEditor(): JanghoodMdEditor
