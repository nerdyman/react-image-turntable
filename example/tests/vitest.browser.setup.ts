import matchers from '@chialab/vitest-axe';
import { expect } from 'vitest';
import 'vitest-browser-react';

import '../src/index.css';

expect.extend(matchers);
