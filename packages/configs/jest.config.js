module.exports = {
    displayName: {
        name: 'TEST',
        color: 'blue',
    },
    testPathIgnorePatterns: ['./node_modules'],
    collectCoverage: true,
    coveragePathIgnorePatterns: ['./node_modules'],
    preset: 'ts-jest',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};
