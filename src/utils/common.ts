import logger from '../helpers/logger';

export function NaN(...args: any[]) {
   return !args.every(arg => !window.isNaN(arg));
}

export function trueNo(...args: any[]) {
   return !args.every(no => !window.isNaN(no) && no <= 0);
}

export function createObjectURL(source: File | Blob | string | null) {
   function _createURL(source: any) {
      if (URL) return URL.createObjectURL(source);
      return webkitURL.createObjectURL(source);
   }

   if (source instanceof File || source instanceof Blob) {
      return _createURL(source);
   } else if ('string' == typeof source) {
      return _createURL(new Blob([source], { type: 'text/plain' }));
   }

   logger.error('Not a file or blob');
   return _createURL(new Blob([]));
}

export function prefersDarkTheme() {
   if (!window.matchMedia) return false;
   return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function preventAnchorReload(event: MouseEvent) {
   if (!event.shiftKey && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      event.stopImmediatePropagation();
   }
}

/**
 * Returns a promise which resolves after `T` seconds.
 */
export function asyncTimer(T: number): Promise<void> {
   return new Promise(resolve => setTimeout(resolve, T));
}
