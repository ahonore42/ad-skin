const MAX_CONCURRENT = 10;
const MAX_QUEUE_SIZE = 50;

let active = 0;
const pending: Array<{ resolve: () => void; reject: (err: Error) => void }> =
  [];

function acquire(): Promise<void> {
  if (active < MAX_CONCURRENT) {
    active++;
    return Promise.resolve();
  }
  if (pending.length >= MAX_QUEUE_SIZE) {
    return Promise.reject(new Error("QUEUE_FULL"));
  }
  return new Promise((resolve, reject) => pending.push({ resolve, reject }));
}

function release() {
  const next = pending.shift();
  if (next) {
    // Transfer the active slot to the next waiter — count stays the same
    next.resolve();
  } else {
    active--;
  }
}

export async function withQueue<T>(fn: () => Promise<T>): Promise<T> {
  await acquire();
  try {
    return await fn();
  } finally {
    release();
  }
}
