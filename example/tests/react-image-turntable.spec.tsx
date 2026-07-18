import { run as axe } from 'axe-core';
import {
  CLASS_NAME_IMG_PRIMARY,
  CLASS_NAME_IMG_SECONDARY,
  ReactImageTurntable,
  useReactImageTurntable,
} from 'react-image-turntable';
import { afterEach, describe, expect, test } from 'vitest';
import { commands, page, userEvent } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';

import { AdvancedDemo } from '../src/demos/Advanced';
import { BasicDemo } from '../src/demos/Basic';

const getSlider = () => page.getByRole('slider');

/** Renders images with a mix of default and custom `alt`/`className` props. */
const CustomImagePropsTest = () => {
  const turntableProps = useReactImageTurntable({
    images: [
      {
        src: 'https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-image-turntable/images/compressed/1.webp',
      },
      {
        src: 'https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-image-turntable/images/compressed/2.webp',
        alt: 'Custom alt text',
        className: 'custom-image',
      },
    ],
  });

  return <ReactImageTurntable {...turntableProps} />;
};

/** Renders a two-image turntable that autorotates quickly, to test wrapping past the last image. */
const FastAutoRotateTest = () => {
  const turntableProps = useReactImageTurntable({
    autoRotate: { enabled: true, interval: 20 },
    images: [
      {
        src: 'https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-image-turntable/images/compressed/1.webp',
        alt: '1',
      },
      {
        src: 'https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-image-turntable/images/compressed/2.webp',
        alt: '2',
      },
    ],
  });

  return <ReactImageTurntable {...turntableProps} />;
};

/** Renders a three-image turntable that autorotates backward quickly, to test wrapping before the first image. */
const FastAutoRotateCounterClockwiseTest = () => {
  const turntableProps = useReactImageTurntable({
    autoRotate: { enabled: true, counterClockwise: true, interval: 20 },
    images: [
      {
        src: 'https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-image-turntable/images/compressed/1.webp',
        alt: '1',
      },
      {
        src: 'https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-image-turntable/images/compressed/2.webp',
        alt: '2',
      },
      {
        src: 'https://raw.githubusercontent.com/nerdyman/stuff/main/libs/react-image-turntable/images/compressed/3.webp',
        alt: '3',
      },
    ],
  });

  return <ReactImageTurntable {...turntableProps} />;
};

describe('ReactImageTurntable', () => {
  afterEach(async () => {
    const results = await axe(document.body, {
      rules: {
        'meta-viewport': { enabled: false },
        region: { enabled: false },
      },
    });

    expect(results).toHaveNoViolations();

    await cleanup();
  });

  test('should update aria attributes when image count changes', async () => {
    window.history.replaceState({}, '', '/?autoRotate=false');
    await render(<AdvancedDemo />);

    const slider = getSlider();

    // AdvancedDemo starts on the 7th image.
    await expect.element(slider).toHaveAttribute('aria-valuenow', '7');
    await expect.element(slider).toHaveAttribute('aria-valuemin', '1');
    await expect.element(slider).toHaveAttribute('aria-valuemax', '48');
    await expect.element(slider).toHaveAttribute('aria-valuetext', '7 of 48');

    // Move to an index that will fall out of bounds once the image count shrinks below it.
    await page.getByRole('spinbutton', { name: /activeImageIndex/ }).fill('30');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '31');

    await page.getByText('Splice images').click();

    await expect.element(slider).toHaveAttribute('aria-valuenow', '1');
    await expect.element(slider).toHaveAttribute('aria-valuemax', '24');
    await expect.element(slider).toHaveAttribute('aria-valuetext', '1 of 24');
  });

  test('should navigate on keyboard arrow left and arrow right when focused', async () => {
    await render(
      <div className="main__turntable">
        <BasicDemo />
      </div>,
    );

    const slider = getSlider();

    await userEvent.tab();
    await expect.element(slider).toHaveFocus();

    await expect.element(slider).toHaveAttribute('aria-valuenow', '7');
    await userEvent.keyboard('{ArrowRight}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '8');
    await userEvent.keyboard('{ArrowRight}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '9');

    await userEvent.tab();
    await userEvent.keyboard('{ArrowLeft}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '9');
    await userEvent.keyboard('{ArrowRight}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '9');
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

    await userEvent.keyboard('{ArrowLeft}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '8');
    await userEvent.keyboard('{ArrowLeft}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '7');
    await userEvent.keyboard('{ArrowLeft}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '6');

    await userEvent.keyboard('{ArrowRight}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '7');
  });

  test('should wrap in both directions when navigating with the keyboard from the boundary image', async () => {
    await render(<CustomImagePropsTest />);

    const slider = getSlider();

    await userEvent.tab();
    await expect.element(slider).toHaveFocus();

    await expect.element(slider).toHaveAttribute('aria-valuenow', '1');
    await userEvent.keyboard('{ArrowLeft}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '2');
    await userEvent.keyboard('{ArrowRight}');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '1');
  });

  test('should navigate on pointer drag', async () => {
    await render(
      <div className="main__turntable">
        <BasicDemo />
      </div>,
    );

    const slider = getSlider();

    await slider.click();
    await expect.element(slider).toHaveFocus();

    const { x: originX, y } = await commands.getElementCenter({ selector: slider.selector });
    let x = originX;

    // Fire initial pointer move + down to set dragging origin.
    await commands.mouseMove({ x, y });
    await commands.mouseDown();

    // Should navigate forwards when dragging right while pointer is down.
    x += 20;
    await commands.mouseMove({ x, y });
    await expect.element(slider).toHaveAttribute('aria-valuenow', '8');
    x += 20;
    await commands.mouseMove({ x, y });
    await expect.element(slider).toHaveAttribute('aria-valuenow', '9');

    // Should not move when pointer is released.
    await commands.mouseUp();
    x += 20;
    await commands.mouseMove({ x, y });
    await expect.element(slider).toHaveAttribute('aria-valuenow', '9');
    await commands.mouseDown();

    // Should navigate backwards when dragging left while pointer is down.
    x -= 20;
    await commands.mouseMove({ x, y });
    await expect.element(slider).toHaveAttribute('aria-valuenow', '8');
    x -= 20;
    await commands.mouseMove({ x, y });
    await expect.element(slider).toHaveAttribute('aria-valuenow', '7');
    x -= 20;
    await commands.mouseMove({ x, y });
    await expect.element(slider).toHaveAttribute('aria-valuenow', '6');

    await commands.mouseUp();
  });

  test('should not navigate on a non-primary (e.g. right) pointer button press', async () => {
    await render(
      <div className="main__turntable">
        <BasicDemo />
      </div>,
    );

    const slider = getSlider();

    await expect.element(slider).toHaveAttribute('aria-valuenow', '7');

    // A real right-click opens the browser's native context menu, which WebKit doesn't
    // reliably dismiss in automated sessions, breaking subsequent tests:
    // https://github.com/microsoft/playwright/issues/39246
    // So we dispatch the pointer event directly to exercise the non-primary-button guard clause.
    slider.element().dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 2 }));
    window.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: 9999 }));

    await expect.element(slider).toHaveAttribute('aria-valuenow', '7');
  });

  test('should wrap the active index when navigating out of bounds via controls', async () => {
    window.history.replaceState({}, '', '/?autoRotate=false');
    await render(<AdvancedDemo />);

    const slider = getSlider();
    const indexInput = page.getByRole('spinbutton', { name: /activeImageIndex/ });
    const previousButton = page.getByTitle('Previous image');
    const nextButton = page.getByTitle('Next image');

    await expect.element(slider).toHaveAttribute('aria-valuenow', '7');

    await previousButton.click();
    await expect.element(slider).toHaveAttribute('aria-valuenow', '6');

    await nextButton.click();
    await expect.element(slider).toHaveAttribute('aria-valuenow', '7');

    // Should wrap out-of-range values entered directly into the index field.
    await indexInput.fill('-1');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '48');

    await indexInput.fill('999');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '1');
  });

  test('should fall back to a default alt and support custom classNames on images', async () => {
    await render(<CustomImagePropsTest />);

    const primaryImage = document.querySelector<HTMLImageElement>(`.${CLASS_NAME_IMG_PRIMARY}`);
    const secondaryImage = document.querySelector<HTMLImageElement>(`.${CLASS_NAME_IMG_SECONDARY}`);

    expect(primaryImage?.alt).toBe('Turntable 1 of 3');
    expect(secondaryImage?.className).toContain('custom-image');
  });

  test('should wrap back to the first image when autorotating past the last image', async () => {
    await render(<FastAutoRotateTest />);

    const slider = getSlider();

    await expect.element(slider).toHaveAttribute('aria-valuenow', '1');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '2');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '1');
  });

  test('should move backward and wrap to the last image when autoRotate.counterClockwise is enabled', async () => {
    await render(<FastAutoRotateCounterClockwiseTest />);

    const slider = getSlider();

    await expect.element(slider).toHaveAttribute('aria-valuenow', '1');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '3');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '2');
  });

  test('should prevent the native browser drag behaviour on images', async () => {
    await render(
      <div className="main__turntable">
        <BasicDemo />
      </div>,
    );

    const img = document.querySelector<HTMLImageElement>(`.${CLASS_NAME_IMG_PRIMARY}`);
    const dragStartEvent = new DragEvent('dragstart', { bubbles: true, cancelable: true });

    img?.dispatchEvent(dragStartEvent);

    expect(dragStartEvent.defaultPrevented).toBe(true);
  });

  test('should move forward automatically when autoRotate is enabled', async () => {
    window.history.replaceState({}, '', '/?autoRotate=false');
    await render(<AdvancedDemo />);

    const slider = getSlider();

    await expect.element(slider).toHaveAttribute('aria-valuenow', '7');

    await page.getByText('autoRotate.enabled').click();

    await expect.element(slider).toHaveAttribute('aria-valuenow', '8');
    await expect.element(slider).toHaveAttribute('aria-valuenow', '9');
  });
});
