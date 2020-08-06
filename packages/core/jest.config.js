const config = require('@ewl/ts-configs/jest.config')
module.exports = Object.assign({}, config, {
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
})
