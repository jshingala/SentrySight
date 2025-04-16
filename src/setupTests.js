import '@testing-library/jest-dom';

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
}

global.IntersectionObserver = MockIntersectionObserver;

global.import = global.import || {};
global.import.meta = global.import.meta || {};
global.import.meta.env = global.import.meta.env || {};
global.import.meta.env.VITE_GOOGLE_API_KEY = 'test-api-key';