
const logger = jest.fn()

const getLoggerMock = (name: string) => ({
    debug: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    fatal: jest.fn()
});

module.exports = {
    __esModule: true,
    default: logger,
    getLogger: getLoggerMock
};
