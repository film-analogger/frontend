import '@testing-library/jest-dom/vitest';

// Configuration globale des tests

// Data-fetching hooks intentionally log failures with `console.error('Error
// fetching X:', err)` before surfacing the error in the UI. Every one of
// those code paths is exercised by a dedicated test, so the log is expected
// noise, not a signal — silence it here instead of spying per test (which
// races the fetch's catch handler against the test's own teardown under
// Vitest's parallel runners). Anything else (React/act warnings, unexpected
// errors) still prints normally.
const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
    const [message] = args;
    if (typeof message === 'string' && message.startsWith('Error fetching ')) {
        return;
    }
    originalConsoleError(...args);
};
