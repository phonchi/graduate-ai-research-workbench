import type { HastPluginDefinition } from 'satteri';

export function rehypeAccessibleTaskLists(): HastPluginDefinition {
  return {
    name: 'accessible-task-lists',
    element: {
      filter: ['input'],
      visit(node, ctx) {
        if (node.properties?.type !== 'checkbox') return;

        const parent = ctx.parent(node);
        if (parent?.type !== 'element' || parent.tagName !== 'li') return;

        const itemText = ctx.textContent(parent).trim();
        const state = node.properties.checked ? '已完成' : '待辦';
        ctx.setProperty(node, 'ariaLabel', itemText ? `${state}：${itemText}` : `${state}項目`);
      },
    },
  };
}
