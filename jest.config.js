const nextJest = require("next/jest")

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: "./"
})

// Add any custom config to be passed to Jest
/** @type {import("jest").Config} */
const config = {
    // Add more setup options before each test is run
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testEnvironment: "jest-environment-jsdom",
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/*.d.ts",
        "!src/app/**/*",
        "!src/stories/**/*",
        "!src/lib/prisma.ts",
    ],
    moduleNameMapper: {
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

        // Handle module aliases
        "@src/(.*)$": "<rootDir>/src/$1",
        "^@components/(.*)$": "<rootDir>/src/components/$1",
        "^@app/(.*)$": "<rootDir>/src/app/$1",
        "^@utils/(.*)$": "<rootDir>/src/lib/utils/$1",
        "^@lib/(.*)$": "<rootDir>/src/lib/$1",
        "^@repository/(.*)$": "<rootDir>/src/repository/$1",
        "^@controller/(.*)$": "<rootDir>/src/controller/$1",
        "^@mocks/(.*)$": "<rootDir>/__mocks__/$1",
    },
    verbose: true,
    silent: true,
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config)