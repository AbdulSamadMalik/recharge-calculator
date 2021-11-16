import { BehaviorSubject } from 'rxjs';

function getStoredValue<A, B = Object>(
   id: string,
   defaultValue: A,
   object?: B,
   key?: keyof B
): A {
   try {
      const stored: any = localStorage.getItem(id);
      if (stored) {
         const { value } = JSON.parse(stored);
         if (object && key) object[key] = value as any;
         return value;
      }
      return defaultValue;
   } catch (error) {
      return defaultValue;
   }
}

export class PersistedSubject<A, B = Object> extends BehaviorSubject<A> {
   constructor(public id: string, value: A, object?: B, key?: keyof B) {
      const val = getStoredValue(id, value, object, key);
      super(val);
   }

   next(value: A) {
      super.next(value);
      localStorage.setItem(this.id, JSON.stringify({ value }));
   }
}
