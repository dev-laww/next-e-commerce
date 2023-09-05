import pino from "pino";
import { mockDeep } from "jest-mock-extended";


const mockLogger = mockDeep<pino.Logger>();
mockLogger.child.mockReturnValue(mockDeep<pino.Logger>());

const getLoggerMock = jest.fn(() => mockLogger);

module.exports = {
    __esModule: true,
    default: mockLogger,
    getDatabaseLogger: getLoggerMock,
    getLogger: getLoggerMock
};
