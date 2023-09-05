import '@testing-library/jest-dom/extend-expect';
import 'jest-fetch-mock';

// @ts-ignore
process.env.NODE_ENV = 'test';

// Setup common mocks
jest.mock('@utils/logging', () => require('@mocks/lib/utils/logging.mock'));
jest.mock("@utils/email", () => require("@mocks/lib/utils/email.mock"));
jest.mock("@lib/prisma", () => require("@mocks/lib/prisma.mock"));