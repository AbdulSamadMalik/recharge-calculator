const form = document.querySelector("form")!;

const valueOutput = document.querySelector("#value-output") as HTMLElement;
const valueBanner = document.querySelector(".recharge-value") as HTMLElement;
const submitButton = document.querySelector(
   "button[type=submit]"
) as HTMLButtonElement;

const costInput = document.querySelector("#cost") as HTMLInputElement;
const dataInput = document.querySelector("#data") as HTMLInputElement;
const daysInput = document.querySelector("#days") as HTMLInputElement;

export function getInputs() {
   return {
      cost: costInput.valueAsNumber,
      data: dataInput.valueAsNumber,
      validity: daysInput.valueAsNumber,
   };
}

export {
   form,
   valueOutput,
   valueBanner,
   submitButton,
   costInput,
   dataInput,
   daysInput,
};
