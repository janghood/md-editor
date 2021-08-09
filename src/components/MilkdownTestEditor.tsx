/*
 * @Author: 望海潮
 * @Date: 2021-07-28 09:03:18
 * @LastEditTime: 2021-08-07 11:03:36
 * @Description:
 */
import { defineComponent } from 'vue';
import { Editor, rootCtx, defaultValueCtx, editorViewOptionsCtx } from '@milkdown/core';
import { VueEditor, useEditor } from '@milkdown/vue';
// import { commonmark } from '@milkdown/preset-commonmark';
import { prism } from '@milkdown/plugin-prism';
import axios from 'axios';


// 监听
import { listener, listenerCtx } from '@milkdown/plugin-listener';


import '@milkdown/theme-nord/lib/theme.css';
// import '@milkdown/preset-commonmark/lib/style.css';

let output = '';
const listenerObj = {
  markdown: [
    (getMarkdown) => {
      output = getMarkdown();
      console.log(output);
    }
  ]
};

let readOnly = false;
const editable: any = () => !readOnly;



export const MilkdownTestEditor = defineComponent(() => {
  const defaultValue = '# Hello';
  const editor = useEditor((root) =>
    new Editor()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        // 设置默认值
        ctx.set(defaultValueCtx, defaultValue);
        // 监听
        ctx.set(listenerCtx, listenerObj);
        // 只读
        // ctx.set(editorViewOptionsCtx, { editable })
      })
      // .use(commonmark)
      .use(prism)
      .use(listener),
  );
  

  // setTimeout(() => {
  //     readOnly = true;
  // }, 5000);


  return () => 
    <>
      {/* {upLoad} */}
      <VueEditor editor={editor}/>
    </>;
});
