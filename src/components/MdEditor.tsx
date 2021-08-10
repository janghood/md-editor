/*
 * @Author: 望海潮
 * @Date: 2021-07-24 13:09:26
 * @LastEditTime: 2021-08-10 10:50:49
 * @Description: 
 */
import { defineComponent, h } from 'vue';
import { Editor, rootCtx, defaultValueCtx, editorViewOptionsCtx } from '@milkdown/core';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { VueEditor, useEditor } from '@milkdown/vue';
import { prism } from '@milkdown/plugin-prism';

import { emoji } from '@milkdown/plugin-emoji';
import { clipboard } from '@milkdown/plugin-clipboard';
import { history } from '@milkdown/plugin-history';
import { tooltip } from '@milkdown/plugin-tooltip';
import { cursor } from '@milkdown/plugin-cursor';
import { slash } from '@milkdown/plugin-slash';
import { gfm } from '@milkdown/preset-gfm';

import '@milkdown/theme-nord/lib/theme.css';
import '@milkdown/plugin-emoji/lib/style.css';
import '@milkdown/plugin-tooltip/lib/style.css';
import '@milkdown/plugin-cursor/lib/style.css';
import '@milkdown/plugin-slash/lib/style.css';
import '@milkdown/preset-gfm/lib/style.css';

export default defineComponent({
  name: 'MdEditor',
  props: {
    // 文本内容
    content: { type: String, default: '' },
    // 是否设置为只读无法编辑
    readOnly: { type: Boolean, default: true }
  },
  render(context) {
    // console.log(context);
    const { readOnly } = context;
    // 监听输入内容
    const listenerConfig = {
      markdown: [(getMarkdown) => this.$emit('update:content', getMarkdown())]
    };

    const editor = useEditor(
      (root) => {
          const editor = new Editor()
            .config((ctx) => {
              ctx.set(rootCtx, root);
              ctx.set(defaultValueCtx, this.content);
              ctx.set(editorViewOptionsCtx, { editable: () => !readOnly })
              ctx.set(listenerCtx, listenerConfig);
            })
            .use(cursor())
            .use(prism)
            .use(gfm)
            .use(history)
            .use(clipboard)
            .use(listener)
            .use(emoji)
            .use(tooltip);
          if (!readOnly) {
            editor.use(slash);
          }
          return editor;
      }
    );
    const mdEditor = h( 
      <VueEditor editor={editor} />
    );

    return h(
      <>
        {mdEditor}
      </>
    )
  },
});
