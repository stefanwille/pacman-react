export const log = (...args: any[]) => {
  if (process.env.NODE_ENV === 'test') {
    return;
  }
  console.log(...args);
};
