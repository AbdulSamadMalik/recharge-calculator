import { fromEvent, merge } from 'rxjs';
import { $, $$, conditionalClass, NaN, truthyNo } from './utils';
import { PersistedSubject } from './helpers/PersistedSubject';
import './styles/main.scss';

const form = $('form');
const valueOutput = $('#value-output');
const valueBanner = $('.recharge-value');

const costInput = $('#cost') as HTMLInputElement;
const dataInput = $('#data') as HTMLInputElement;
const daysInput = $('#days') as HTMLInputElement;

const submitButton = $('button.submit') as HTMLButtonElement;

export function getValues() {
   return {
      cost: costInput.valueAsNumber,
      data: dataInput.valueAsNumber,
      validity: daysInput.valueAsNumber,
   };
}

const cost$ = new PersistedSubject('cost', 0, costInput, 'value');
const data$ = new PersistedSubject('data', 0, dataInput, 'value');
const validity$ = new PersistedSubject('days', 0, daysInput, 'value');

merge(cost$, data$, validity$).subscribe(setRechargeValue);

function setRechargeValue() {
   const { cost, data, validity } = getValues();

   function setOutputClass(className: string) {
      form.className = `form ${className}`;
      valueOutput.className = `value-output block ${className}`;
   }

   const isNaN = NaN(cost, data, validity) || !truthyNo(data);

   conditionalClass(valueBanner, isNaN, 'hidden');
   conditionalClass(submitButton, !isNaN, 'hidden');

   if (!isNaN) {
      const calc = ((data * validity) / cost) * 100;
      const result = parseFloat(calc.toFixed(2));

      if (result >= 80 || result == Infinity) setOutputClass('green');
      if (result <= 80) setOutputClass('purple');
      if (result <= 60) setOutputClass('yellow');
      if (result <= 40) setOutputClass('orange');
      if (result <= 20 || result == -Infinity) setOutputClass('red');

      valueOutput.textContent = result.toString();
   }
}

function setValue(event: Event, observable: PersistedSubject<number>) {
   const target = event.target as HTMLInputElement;

   if (target.valueAsNumber < 0)
      target.value = Math.abs(target.valueAsNumber).toString();
   return observable.next(target.valueAsNumber);
}

fromEvent(costInput, 'input').subscribe((e) => setValue(e, cost$));
fromEvent(dataInput, 'input').subscribe((e) => setValue(e, data$));
fromEvent(daysInput, 'input').subscribe((e) => setValue(e, validity$));

$$<HTMLInputElement>('input').forEach((input) => {
   input.addEventListener('focus', () => input?.select());
   input.addEventListener('contextmenu', (e) => e.preventDefault());
});

form.addEventListener('submit', (event) => event.preventDefault());
