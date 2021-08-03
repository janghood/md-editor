import { defineComponent } from 'vue';
import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
import { VueEditor, useEditor } from '@milkdown/vue';
import { commonmark } from '@milkdown/preset-commonmark';

import '@milkdown/theme-nord/lib/theme.css';
import '@milkdown/preset-commonmark/lib/style.css';

export const MilkdownEditor = defineComponent(() => {
    const defaultValue = '# Hello'
    const editor = useEditor((root) =>
        new Editor()
            .config((ctx) => {
                ctx.set(rootCtx, root);
                // 设置默认值
                ctx.set(defaultValueCtx, defaultValue);
            })
            .use(commonmark),
    );

    return () => <VueEditor editor={editor} />;
});
