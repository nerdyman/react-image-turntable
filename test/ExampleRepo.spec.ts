import type { Page } from '@playwright/test';

// import { test, expect } from './baseFixtures';
import { test, expect } from '@playwright/test';
import { checkA11y, configureAxe, injectAxe } from 'axe-playwright';

test.describe('Example Repo', () => {
  const getComponentRoot = (page: Page) => page.getByRole('slider');

  test.beforeEach(async ({ page }) => {
    await page.goto(`http://localhost:${process.env.PORT}/?debug`);
    await injectAxe(page);

    configureAxe(page, {
      checks: [
        { id: 'page-has-heading-one', enabled: false },
        { id: 'meta-viewport', enabled: false },
        { id: 'region', enabled: false },
      ],
    });
  });

  test.afterEach(async ({ page }) => {
    await checkA11y(page);
  });

  test('Should generate correct aria attributes', async ({ page }) => {
    const component = getComponentRoot(page);

    // Check initial values on mount.
    await expect(component).toHaveAttribute('aria-valuenow', '1');
    await expect(component).toHaveAttribute('aria-valuemin', '1');
    await expect(component).toHaveAttribute('aria-valuemax', '36');
    await expect(component).toHaveAttribute('aria-valuetext', '1 of 36');

    // Change image count.
    await page.locator('text=Toggle image set').click();
    await expect(component).toHaveAttribute('aria-valuenow', '1');
    await expect(component).toHaveAttribute('aria-valuemax', '12');
    await expect(component).toHaveAttribute('aria-valuetext', '1 of 12');

    // Change initial index.
    await page.locator('text=Toggle initial index').click();
    await expect(component).toHaveAttribute('aria-valuenow', '12');
    await expect(component).toHaveAttribute('aria-valuetext', '12 of 12');
  });

  test('Should navigate on keyboard arrow left and arrow right when focused', async ({ page }) => {
    const component = getComponentRoot(page);

    // Should be focusable by tabbing.
    await page.keyboard.press('Tab');
    await expect(component).toBeFocused();

    // Should navigate forwards on arrow right when focused.
    await expect(component).toHaveAttribute('aria-valuenow', '1');
    await page.keyboard.press('ArrowRight');
    await expect(component).toHaveAttribute('aria-valuenow', '2');
    await page.keyboard.press('ArrowRight');
    await expect(component).toHaveAttribute('aria-valuenow', '3');

    // Should **not** navigate backwards or forwards when unfocused.
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowLeft');
    await expect(component).toHaveAttribute('aria-valuenow', '3');
    await page.keyboard.press('ArrowRight');
    await expect(component).toHaveAttribute('aria-valuenow', '3');
    await page.keyboard.press('Shift+Tab');

    // Should navigate backwards on arrow left when focused.
    await page.keyboard.press('ArrowLeft');
    await expect(component).toHaveAttribute('aria-valuenow', '2');
    await page.keyboard.press('ArrowLeft');
    await expect(component).toHaveAttribute('aria-valuenow', '1');
    await page.keyboard.press('ArrowLeft');
    await expect(component).toHaveAttribute('aria-valuenow', '36');

    await page.keyboard.press('ArrowRight');
    await expect(component).toHaveAttribute('aria-valuenow', '1');
  });

  test('Should navigate on pointer drag', async ({ page }) => {
    const component = getComponentRoot(page);

    await component.click();
    await expect(component).toBeFocused();

    // Fire initial click to set dragging origin.
    await page.mouse.move(512, 200);
    await page.mouse.down();

    // Should navigate forwards when dragging right while mouse is down.
    await expect(component).toHaveAttribute('aria-valuenow', '1');
    await page.mouse.move(512 + 20, 200);
    await expect(component).toHaveAttribute('aria-valuenow', '2');
    await page.mouse.move(512 + 40, 200);
    await expect(component).toHaveAttribute('aria-valuenow', '3');

    // Should **not** navigate when mouse up is fired.
    await page.mouse.up();
    await page.mouse.move(512 + 60, 200);
    await expect(component).toHaveAttribute('aria-valuenow', '3');
    await page.mouse.down();

    // Should navigate backwards when dragging right while mouse is down.
    await page.mouse.move(512 + 20, 200);
    await expect(component).toHaveAttribute('aria-valuenow', '2');
    await page.mouse.move(512, 200);
    await expect(component).toHaveAttribute('aria-valuenow', '1');
    await page.mouse.move(512 - 20, 200);
    await expect(component).toHaveAttribute('aria-valuenow', '36');

    await page.mouse.up();
  });
});
