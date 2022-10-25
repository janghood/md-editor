/**
 * @description
 * @author 阿怪
 * @date 2022/10/26 04:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defaultValueCtx, Editor, editorViewOptionsCtx, rootCtx, themeFactory } from "@milkdown/core";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { createTheme } from "./janghoodTheme";
import { gfm } from "@milkdown/preset-gfm";
import { clipboard } from "@milkdown/plugin-clipboard";
import { history } from "@milkdown/plugin-history";
import { prismPlugin } from "@milkdown/plugin-prism";
import { emoji } from "@milkdown/plugin-emoji";
import { tooltip } from "@milkdown/plugin-tooltip";
import { math } from "@milkdown/plugin-math";
import { diagram } from "@milkdown/plugin-diagram";
import { defaultActions, slash, slashPlugin } from "@milkdown/plugin-slash";
import { MdEditorProps } from "./MdEditorProps";
import { ref } from "vue";


export default function useMdEditor(props: MdEditorProps, emit: (event: string, ...args: any[]) => void) {
  const mdUpdateFlag = ref(false);
  let isFirstRender = true;

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
          mdUpdateFlag.value = true;
          if (isFirstRender) {
            isFirstRender = false;
            mdUpdateFlag.value = false;
          }
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

  return {
    mdUpdateFlag,
    createEditor
  }
}
