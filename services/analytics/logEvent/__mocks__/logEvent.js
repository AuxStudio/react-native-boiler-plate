export default function logEvent() {
  return new Promise((resolve) => {
    process.nextTick(() => {
      resolve();
    });
  });
}
