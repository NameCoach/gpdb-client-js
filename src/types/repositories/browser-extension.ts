import BrowserExtension from '../input/browser-extension';

export default interface IBrowserExtensionRepo {
  create: (arg0: BrowserExtension) => Promise<unknown>;
}
