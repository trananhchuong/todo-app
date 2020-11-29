module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        '@typescript-eslint'
    ],
    'rules': {
        'semi': ['error', 'always'],
        'quotes': ['error', 'single']
    }
};



// module.exports = {
//     'env': {
//         'browser': true,
//         'es2020': true
//     },
//     'extends': [
//         'eslint:recommended',
//         'plugin:react/recommended',
//         'plugin:@typescript-eslint/recommended'
//     ],
//     'parser': '@typescript-eslint/parser',
//     'parserOptions': {
//         'ecmaFeatures': {
//             'jsx': true
//         },
//         'ecmaVersion': 11,
//         'sourceType': 'module'
//     },
//     'globals': {
//         '_': true,
//         'moment': true,
//         'axios': true
//     },
//     'plugins': [
//         'react',
//         '@typescript-eslint'
//     ],
//     'rules': {
//         'indent': [
//             'error',
//             2,
//             { "SwitchCase": 1 }
//         ],
//         'linebreak-style': 0,
//         'quotes': [
//             'error',
//             'single'
//         ],
//         'semi': [
//             'error',
//             'always'
//         ],
//         'comma-dangle': [
//             0,
//             'always-multiline'
//         ],
//         'react/jsx-indent': [
//             0,
//             2
//         ],
//         'react/jsx-indent-props': [
//             0,
//             2
//         ],
//         'no-console': 0,
//         'react/prop-types': 0,
//         'react/no-string-refs': 0,
//         'max-len': 0,
//         'prefer-template': 0,
//         'no-use-before-define': 0,
//         'newline-per-chained-call': 0,
//         'no-underscore-dangle': 0,
//         'react/jsx-filename-extension': 0,
//         'jsx-a11y/no-static-element-interactions': 0,
//         'no-param-reassign': 0,
//         'arrow-body-style': [
//             0,
//             'as-needed'
//         ],
//         'no-var': 1,
//         'prefer-arrow-callback': 0,
//         'func-names': 0,
//         'react/no-unused-prop-types': 0,
//         'react/sort-comp': 0,
//         'react/jsx-closing-bracket-location': 0,
//         'class-methods-use-this': 0,
//         'valid-typeof': 0,
//         'jsx-quotes': 0,
//         'react/self-closing-comp': 0,
//         'react/jsx-boolean-value': 0,
//         'arrow-parens': 0,
//         'quote-props': 0,
//         'no-useless-constructor': 0,
//         'no-plusplus': 0,
//         'new-parens': 0,
//         'react/no-did-mount-set-state': 0,
//         'no-unneeded-ternary': 0,
//         'react/prefer-es6-class': 0,
//         'no-nested-ternary': 0,
//         'no-mixed-operators': 0,
//         'react/forbid-prop-types': 0,
//         'no-extra-boolean-cast': 0,
//         'react/jsx-no-target-blank': 0,
//         'no-template-curly-in-string': 0,
//         'jsx-a11y/label-has-for': 0,
//         'react/no-find-dom-node': 0,
//         'react/no-array-index-key': 0,
//         'global-require': 0,
//         'react/jsx-curly-spacing': 0,
//         'spaced-comment': 0,
//         'no-unused-expressions': 0,
//         'jsx-a11y/href-no-hash': 0,
//         'react/prefer-stateless-function': 0,
//         'eol-last': 0,
//         '@typescript-eslint/no-explicit-any': 0,
//         '@typescript-eslint/explicit-module-boundary-types': 0,
//         '@typescript-eslint/no-non-null-assertion': 0,
//         '@typescript-eslint/no-var-requires': 0,
//         '@typescript-eslint/no-empty-interface': 0
//     }
// };
