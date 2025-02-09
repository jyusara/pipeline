const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

const baseConfig = {
	preset: 'ts-jest',

	// loads .env file
	setupFiles: ['dotenv/config'],

	// Other test setup
	setupFilesAfterEnv: ['jest-extended'],

	coveragePathIgnorePatterns: ['.json', '.snap'],

	// The test environment that will be used for testing
	testEnvironment: 'node',

	testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/scripts'],

	modulePaths: [compilerOptions.baseUrl],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: '<rootDir>/' })
};

const small = {
	...baseConfig,
	displayName: 'small',
	testMatch: ['**.test.ts']
};

const medium = {
	...baseConfig,
	displayName: 'medium',
	testMatch: ['**.medium-test.ts', '**/**.medium-test.ts']
};

module.exports = {
	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: false,

	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80
		}
	},

	// An array of glob patterns indicating a set of files for which coverage information should be collected
	collectCoverageFrom: [
		'**/**/**/**/src/**.ts',
		'**/**/**/**/src/**/**.ts',
		'!**/**/**/**/src/**/**test.ts',
		'!_tests_/**',
		'!scripts/**',
		'!**/**/**/**/src/**/api.service.ts',
		'!**/**/**/**/src/**/project.service.ts'
	],
	coveragePathIgnorePatterns: ['scripts/**'],

	projects: [small, medium],
	// Indicates whether each individual test should be reported during the run
	verbose: true

	// modulePaths: [compilerOptions.baseUrl],
	// moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};