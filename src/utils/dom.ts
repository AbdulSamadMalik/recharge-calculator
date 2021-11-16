import logger from '../helpers/logger';

export function $<T extends HTMLElement>(selector: string): T {
   return document.querySelector<T>(selector)!;
}

export function $$<T extends HTMLElement>(selector: string): T[] {
   return Array.from(document.querySelectorAll(selector));
}

export function conditionalAttribute(
   element: HTMLElement,
   condition: boolean,
   name: string,
   value = ''
) {
   try {
      if (element && element.setAttribute && condition === true) {
         element.setAttribute(name, value);
      } else if (element && element.removeAttribute && condition === false) {
         element.removeAttribute(name);
      }
   } catch (error) {
      logger.error(error);
   }
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
