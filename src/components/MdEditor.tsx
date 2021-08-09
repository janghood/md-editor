/*
 * @Author: 望海潮
 * @Date: 2021-07-24 13:09:26
 * @LastEditTime: 2021-08-09 17:33:20
 * @Description: 
 */
import { defineComponent, h } from 'vue';
import { Editor, rootCtx, defaultValueCtx, editorViewOptionsCtx } from '@milkdown/core';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { VueEditor, useEditor } from '@milkdown/vue';
import { prism } from '@milkdown/plugin-prism';
import { ElUpload } from 'element-plus';
import axios from 'axios';

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

    // const handleUpload = async (e) => {
    //   let formData = new FormData();
    //   formData.append('file', e.file, e.file.name);
    //   const res = await axios.post(
    //     '/api/file/upload/tmp', formData
    //   );
    //   console.log(res);
    // }

    const mdEditor = h( 
      <VueEditor editor={editor} />
    );

    // const upLoad = h(
    //   <ElUpload http-request={handleUpload} class="upload-demo" action="#">
    //     <el-button size="small" type="primary">点击上传</el-button>
    //   </ElUpload>
    // )

    return h(
      <>
        {mdEditor}
      </>
    )
  },
});
