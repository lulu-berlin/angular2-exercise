// App
export * from './app.component';
export * from './text.service';

import { TextService } from './text.service';

// Application wide providers
export const APP_PROVIDERS = [
  TextService
];
