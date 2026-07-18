import type {} from '@vitest/browser-playwright';
import type { Page } from 'playwright';
import type { BrowserCommand } from 'vitest/node';

type MouseMoveOptions = NonNullable<Parameters<Page['mouse']['move']>[2]>;
type MouseDownOptions = NonNullable<Parameters<Page['mouse']['down']>[0]>;
type MouseUpOptions = NonNullable<Parameters<Page['mouse']['up']>[0]>;

export const getElementCenter: BrowserCommand<[args: { selector: string }]> = async (ctx, { selector }) => {
  const box = await ctx.iframe.locator(selector).boundingBox();

  if (!box) {
    throw new Error(`Could not resolve a bounding box for selector: ${selector}`);
  }

  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
};

export const mouseMove: BrowserCommand<[args: { x: number; y: number } & MouseMoveOptions]> = async (
  ctx,
  { x, y, ...options },
) => {
  await ctx.page.mouse.move(x, y, options);
};

export const mouseDown: BrowserCommand<[args?: MouseDownOptions]> = async (ctx, options) => {
  await ctx.page.mouse.down(options);
};

export const mouseUp: BrowserCommand<[args?: MouseUpOptions]> = async (ctx, options) => {
  await ctx.page.mouse.up(options);
};

declare module 'vitest/browser' {
  interface BrowserCommands {
    getElementCenter: (args: { selector: string }) => Promise<{ x: number; y: number }>;
    mouseMove: (args: { x: number; y: number } & MouseMoveOptions) => Promise<void>;
    mouseDown: (args?: MouseDownOptions) => Promise<void>;
    mouseUp: (args?: MouseUpOptions) => Promise<void>;
  }
}
