<<<<<<< Updated upstream
<<<<<<< Updated upstream
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Extend expect matchers
expect.extend({});

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
=======
=======
>>>>>>> Stashed changes
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure longer timeout for async operations
configure({ 
  asyncUtilTimeout: 5000,
  testTimeout: 10000 
});

// Increase Jest timeout globally
jest.setTimeout(10000);

// Mock IntersectionObserver
class IntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
}
global.IntersectionObserver = IntersectionObserver;

// Mock window.matchMedia
const mockMatchMedia = () => ({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
  media: '',
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn(query => mockMatchMedia())
});

// Mock ResizeObserver
class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
}
global.ResizeObserver = ResizeObserver;

// Configure React 18 concurrent features
global.IS_REACT_ACT_ENVIRONMENT = true;

// Mock window methods
window.scrollTo = jest.fn();
window.scroll = jest.fn();
window.alert = jest.fn();
window.prompt = jest.fn();
window.confirm = jest.fn();

// Mock window.location
const mockLocation = {
  ...window.location,
  reload: jest.fn(),
  assign: jest.fn(),
  replace: jest.fn()
};

Object.defineProperty(window, 'location', {
  writable: true,
  value: mockLocation
});

// Mock window properties
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024
});

Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 768
});

Object.defineProperty(window, 'scrollY', {
  writable: true,
  configurable: true,
  value: 0
});

// Create a more robust localStorage mock
const createLocalStorageMock = () => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = String(value);
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    length: 0,
    key: jest.fn(index => Object.keys(store)[index] || null),
    _getStore: () => store // Helper for testing
  };
};

// Set up localStorage mock
Object.defineProperty(window, 'localStorage', {
  writable: true,
  value: createLocalStorageMock()
});

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
  window.localStorage.clear();
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
});

