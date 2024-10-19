/* eslint-disable no-console */
import { AxeBuilder } from '@axe-core/playwright';
import { type Page, expect } from '@playwright/test';

import { test } from './fixtures';

test.describe('ReactImageTurntable', () => {
  const getSliderElement = (page: Page) => page.getByRole('slider');

  test.afterEach(async ({ page }) => {
    const axeBuilder = new AxeBuilder({ page });
    axeBuilder.disableRules(['meta-viewport', 'region']);

    const { violations } = await new AxeBuilder({ page }).exclude('.controls').analyze();

    if (violations.length) {
      console.error(`[axe] violations: `, violations);
      throw new Error('axe violations found');
    }
  });

  test('should update aria attributes when image count changes', async ({ page }) => {
    await page.goto(`http://localhost:${process.env.PORT}?noNav=true&autoRotate=false`);
    const slider = getSliderElement(page);

    await test.step('Initial values match', async () => {
      await expect(slider).toHaveAttribute('aria-valuenow', '1');
      await expect(slider).toHaveAttribute('aria-valuemin', '1');
      await expect(slider).toHaveAttribute('aria-valuemax', '36');
      await expect(slider).toHaveAttribute('aria-valuetext', '1 of 36');
    });

    await test.step('Update count after splicing images', async () => {
      await page.locator('text=Splice images').click();
      await expect(slider).toHaveAttribute('aria-valuenow', '1');
      await expect(slider).toHaveAttribute('aria-valuemax', '18');
      await expect(slider).toHaveAttribute('aria-valuetext', '1 of 18');
    });
  });

  test('should navigate on keyboard arrow left and arrow right when focused', async ({ page }) => {
    await page.goto(`http://localhost:${process.env.PORT}/basic?noNav=true`);
    const slider = getSliderElement(page);

    await page.keyboard.press('Tab');
    await expect(slider).toBeFocused();

    await test.step('move forward on arrow right when focused', async () => {
      await expect(slider).toHaveAttribute('aria-valuenow', '1');
      await page.keyboard.press('ArrowRight');
      await expect(slider).toHaveAttribute('aria-valuenow', '2');
      await page.keyboard.press('ArrowRight');
      await expect(slider).toHaveAttribute('aria-valuenow', '3');
    });

    await test.step('does not move when unfocused', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowLeft');
      await expect(slider).toHaveAttribute('aria-valuenow', '3');
      await page.keyboard.press('ArrowRight');
      await expect(slider).toHaveAttribute('aria-valuenow', '3');
      await page.keyboard.press('Shift+Tab');
    });

    await test.step('moves backwards on arrow left when focused', async () => {
      await page.keyboard.press('ArrowLeft');
      await expect(slider).toHaveAttribute('aria-valuenow', '2');
      await page.keyboard.press('ArrowLeft');
      await expect(slider).toHaveAttribute('aria-valuenow', '1');
      await page.keyboard.press('ArrowLeft');
      await expect(slider).toHaveAttribute('aria-valuenow', '36');
    });

    await test.step('moves back to start when arrow right is pressed when on last image', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(slider).toHaveAttribute('aria-valuenow', '1');
    });
  });

  test('should navigate on pointer drag', async ({ page }) => {
    await page.goto(`http://localhost:${process.env.PORT}/basic?noNav=true`);
    const slider = getSliderElement(page);

    await slider.click();
    await expect(slider).toBeFocused();

    // Fire initial click to set dragging origin.
    await page.mouse.move(512, 200);
    await page.mouse.down();

    // Should navigate forwards when dragging right while mouse is down.
    await test.step('moves forward on drag right when focused', async () => {
      await page.mouse.move(512 + 20, 200);
      await expect(slider).toHaveAttribute('aria-valuenow', '2');
      await page.mouse.move(512 + 40, 200);
      await expect(slider).toHaveAttribute('aria-valuenow', '3');
    });

    await test.step('does not move when unfocused', async () => {
      await page.mouse.up();
      await page.mouse.move(512 + 60, 200);
      await expect(slider).toHaveAttribute('aria-valuenow', '3');
      await page.mouse.down();
    });

    await test.step('moves backwards on drag left when focused', async () => {
      await page.mouse.move(512 + 20, 200);
      await expect(slider).toHaveAttribute('aria-valuenow', '2');
      await page.mouse.move(512, 200);
      await expect(slider).toHaveAttribute('aria-valuenow', '1');
      await page.mouse.move(512 - 20, 200);
      await expect(slider).toHaveAttribute('aria-valuenow', '36');
    });

    await page.mouse.up();
  });

  test('should move forward automatically when autoRotate is enabled', async ({ page }) => {
    await page.goto(`http://localhost:${process.env.PORT}/?noNav=true&autoRotate=false`);
    const slider = getSliderElement(page);

    await test.step('has initial value', async () => {
      await expect(slider).toHaveAttribute('aria-valuenow', '1');
    });

    await test.step('enable autoRotate', async () => {
      await page.locator('text=autoRotate.enabled').click();
    });

    await test.step('automatically moves forward', async () => {
      await page.waitForTimeout(75);
      await expect(slider).toHaveAttribute('aria-valuenow', '2');
      await page.waitForTimeout(75);
      await expect(slider).toHaveAttribute('aria-valuenow', '3');
    });
  });
});
