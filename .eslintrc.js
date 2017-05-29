module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:flowtype/recommended',
        'plugin:react/recommended',
        'prettier',
        'prettier/flowtype',
        'prettier/react'
    ],
    env: {
        es6: true,
        browser: true,
        node: true
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
            impliedStrict: true
        }
    },
    plugins: [
        'flowtype',
        'react',
        'prettier'
    ],
    rules: {
        'react/prop-types': 'off', // For now, would add Flow + tcomb later
        'prettier/prettier': ['error', {
            useTabs: true,
            tabWidth: 4,
            singleQuote: true,
            semi: false
        }]
    }
}
