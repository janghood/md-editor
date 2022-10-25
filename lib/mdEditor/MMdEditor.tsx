/**
 * @description md组件
 * @author 望海潮
 * @date 2021-08-20 17:06:16
 * @version v2.0.0
 *
 * v2.0.0 阿怪 优化渲染逻辑及修复外部数据改变后内部不更新问题
 */

import { defineComponent, ref } from 'vue';
import {
  defaultValueCtx,
  Editor,
  editorViewCtx,
  editorViewOptionsCtx,
  parserCtx,
  rootCtx,
  themeFactory
} from '@milkdown/core';
import { useEditor, VueEditor } from '@milkdown/vue';
import { clipboard } from '@milkdown/plugin-clipboard';
import { history } from '@milkdown/plugin-history';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { prismPlugin } from '@milkdown/plugin-prism';
import { emoji } from '@milkdown/plugin-emoji';
import { defaultActions, slash, slashPlugin } from '@milkdown/plugin-slash';
import { tooltip } from '@milkdown/plugin-tooltip';
import { gfm } from '@milkdown/preset-gfm';
import { math } from '@milkdown/plugin-math';
import { diagram } from '@milkdown/plugin-diagram';
import 'katex/dist/katex.min.css';
import './index.scss';
import { createTheme } from "./janghoodTheme";
import { Slice } from "prosemirror-model";
import { props } from "./props";
import useModelValue from "../_utils/useModelValue";

export default defineComponent({
  name: 'MMdEditor',
  props,
  setup(props, { emit }) {

    const content = ref('');

    const createEditor = (
      root: HTMLElement | null,
      defaultValue: string,
      readonly: boolean | undefined
    ) => {
      const editor = Editor.make()
        .config((ctx) => {
          ctx.set(rootCtx, root);
          ctx.set(defaultValueCtx, defaultValue);
          ctx.set(editorViewOptionsCtx, { editable: () => !readonly });
          ctx.get(listenerCtx).markdownUpdated((c, markdown) => {
            emit('update:modelValue', markdown);
          })
        })
        .use(themeFactory((emotion, manager) =>
          createTheme()(emotion, manager)))
        .use(gfm);

      let { options } = props;
      options = {
        clipboard: true,
        history: true,
        prism: true,
        emoji: true,
        tooltip: true,
        math: true,
        diagram: true,
        ...options
      }
      if (options.clipboard) {
        editor.use(clipboard);
      }
      editor.use(listener)
      if (options.history) {
        editor.use(history)
      }
      if (options.prism) {
        editor.use(prismPlugin({}))
      }
      if (options.emoji) {
        editor.use(emoji)
      }
      if (options.tooltip) {
        editor.use(tooltip)
      }
      if (options.math) {
        editor.use(math)
      }
      if (options.diagram) {
        editor.use(diagram)
      }
      editor.use(slash.configure(slashPlugin, {
        config: ctx => {
          return ({ content, isTopLevel }) => {
            if (!isTopLevel) return null;

            if (!content) {
              return { placeholder: props.placeholder };
            }

            if (content.startsWith('/')) {
              return content === '/'
                ? {
                  placeholder: '请输入命令...',
                  actions: defaultActions(ctx),
                }
                : {
                  actions: defaultActions(ctx, content),
                };
            }

            return null;
          };
        }
      }))

      return editor;
    };

    const getEditor = (root: HTMLElement) => {
      return createEditor(root, content.value, props.readonly)
    }

    const { editor } = useEditor(getEditor);


    useModelValue(content, props, {
      initInfo: () => {
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
      }
    });


    return () => (<VueEditor class="m-md-editor" editor={editor}/>)
  }
});
