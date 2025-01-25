export const waiting = () => Math.floor(Math.random() * 5);
export const wait = async (duration: number) =>
  new Promise((res) => setTimeout(res, duration * 1000));
