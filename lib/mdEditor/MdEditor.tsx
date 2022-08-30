/*
 * @Author: 望海潮
 * @Date: 2021-08-20 17:06:16
 * @LastEditTime: 2021-08-24 13:48:23
 * @Description: md组件
 */
import { defineComponent, h } from 'vue';
import { defaultValueCtx, Editor, editorViewOptionsCtx, rootCtx, themeFactory } from '@milkdown/core';
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

export default defineComponent({
  name: 'MdEditor',
  props: {
    content: { type: String, default: '' },
    placeholder: { type: String, default: '请输入...' },
    readonly: { type: Boolean, default: false },
    options: {
      type: Object, default: () => ({
        clipboard: true,
        history: true,
        prism: true,
        emoji: true,
        tooltip: true,
        math: true,
        diagram: true,
      })
    }
  },
  setup(props, { emit }) {

    return () => {
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
              emit('update:content', markdown);
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


      const { editor } = useEditor(
        (root) => {
          return createEditor(root, props.content, props.readonly)
        }
      );

      return h(
        <VueEditor class="janghood-md" editor={editor}/>
      )
    }
  }
});
