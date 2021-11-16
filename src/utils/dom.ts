import logger from '../helpers/logger';

export function $<T extends HTMLElement>(selector: string): T {
   return document.querySelector<T>(selector)!;
}

export function $$<T extends HTMLElement>(selector: string): T[] {
   return Array.from(document.querySelectorAll(selector));
}

export function conditionalClass(
   element: HTMLElement,
   condition: boolean,
   className: string
) {
   try {
      if (condition === true) {
         element.classList.add(className);
      } else if (condition === false) {
         element.classList.remove(className);
      }
   } catch (error) {
      logger.error(error);
   }
}
