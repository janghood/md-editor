/**
 * @description md组件
 * @author 望海潮
 * @date 2021-08-20 17:06:16
 * @version v2.0.1
 *
 * v2.0.0 阿怪 优化渲染逻辑及修复外部数据改变后内部不更新问题
 * v2.0.1 阿怪 优化代码结构及修复反复重绘问题
 */

import { defineComponent, watch } from 'vue';
import { useEditor, VueEditor } from '@milkdown/vue';
import 'katex/dist/katex.min.css';
import './index.scss';
import { props } from "./props";
import useMdEditor from "./useMdEditor";
import { editorViewCtx, parserCtx } from "@milkdown/core";
import { Slice } from "prosemirror-model";

export default defineComponent({
  name: 'MMdEditor',
  props,
  setup(props, { emit }) {

    const { createEditor, mdUpdateFlag } = useMdEditor(props, emit);


    const { editor } = useEditor(
      (root: HTMLElement) => createEditor(root, props.modelValue, props.readonly));


    watch(() => props.modelValue, () => {
      if (mdUpdateFlag.value === true) {
        mdUpdateFlag.value = false;
        return;
      }

      editor.editor.value?.action((ctx) => {
        const view = ctx.get(editorViewCtx);
        const parser = ctx.get(parserCtx);
        const doc = parser(props.modelValue);
        if (!doc) return;
        const state = view.state;
        view.dispatch(
          state.tr.replace(
            0,
            state.doc.content.size,
            new Slice(doc.content, 0, 0)
          )
        );

      })
    })


    return () => (<VueEditor class="m-md-editor" editor={editor}/>)
  }
});
