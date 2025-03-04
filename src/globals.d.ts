declare global {
  interface Window {
    setInterval(
      handler: TimerHandler,
      timeout?: number,
      ...arguments: any[]
    ): number;
    clearInterval(handle?: number): void;
  }
}
declare module "react-scroll";
export {};
