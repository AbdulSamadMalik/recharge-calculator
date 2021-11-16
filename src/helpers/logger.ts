export class Logger {
   enabled = import.meta.env.DEV;
   log(...args: any[]) {
      this.enabled && console.log(...["[log]", ...args]);
   }
   info(...args: any[]) {
      this.enabled && console.info(...["[info]", ...args]);
   }
   warn(...args: any[]) {
      this.enabled && console.warn(...["[warn]", ...args]);
   }
   error(...args: any[]) {
      this.enabled && console.error(...["[error]", ...args]);
   }
}

export default new Logger();
