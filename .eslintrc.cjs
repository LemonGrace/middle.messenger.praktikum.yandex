module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'airbnb-base/legacy',
	],
	"parser": "@typescript-eslint/parser",
	"plugins": ["@typescript-eslint"],
	'rules': {
		'no-restricted-syntax': 'off',
		'no-unused-expressions': 'off',
		'no-console': ['error', { allow: ['warn', 'error'] }],
		'import/no-unresolved': 'off',
		'eol-last': ['error', 'always'],
		'sort-imports': [
			'off',
			{
				ignoreCase: false,
				ignoreDeclarationSort: false,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
				allowSeparatedGroups: true,
			},
		],
		'import/no-duplicates': 'off',
		"no-tabs": 0,
		'max-len': ['error', { code: 120, tabWidth: 4, 'ignoreComments': true }],
		'function-call-argument-newline': ['error', 'consistent'],
		'function-paren-newline': ['error', 'consistent'],
		'array-element-newline': ['error', 'consistent'],
		'camelcase': ["error", { "properties": "never", ignoreDestructuring: true }],
		'array-bracket-newline': ['error', { 'multiline': true }],
		'array-bracket-spacing': ['error', 'never'],
		'object-curly-spacing': ['error', 'always'],
		'object-curly-newline': ['error', { 'consistent': true }],
		'object-property-newline': ['error', { allowMultiplePropertiesPerLine: false }],
		'comma-dangle': ['error', 'always-multiline'],
		'no-multiple-empty-lines': ["error", { 'max': 2 }],
		'no-shadow': 'off',
		'no-unused-vars': 'off',
		'class-methods-use-this': 'off',
		'@typescript-eslint/no-unused-vars': "error",
		'@typescript-eslint/no-empty-interface': [
			'error',
			{
				allowSingleExtends: false,
			},
		],
		'indent': [
			'error',
			'tab',
		],
		'linebreak-style': [
			'error',
			'windows',
		],
		'quotes': [
			'error',
			'single',
		],
		'semi': [
			'error',
			'always',
		],
		"no-explicit-any": "off",
		"@typescript-eslint/no-explicit-any": "off",
		'lines-between-class-members': 'off',
		'no-underscore-dangle': 'off',
		'no-param-reassign': 'off',
		'no-use-before-define': 'off',
		'no-plusplus': 'off',
		'no-continue': 'off',
		'@typescript-eslint/member-ordering': [
			'error',
			{
				default: [
					// Static
					'private-static-field',
					'protected-static-field',
					'public-static-field',
					'static-field',
					'private-static-method',
					'protected-static-method',
					'public-static-method',
					'static-method',

					// Fields
					'private-decorated-field',
					'protected-decorated-field',
					'public-decorated-field',
					'decorated-field',

					'private-instance-field',
					'protected-instance-field',
					'public-instance-field',

					'private-field',
					'protected-field',
					'public-field',

					'instance-field',

					'field',

					// Constructors
					'private-constructor',
					'protected-constructor',
					'public-constructor',

					'constructor',

					'private-decorated-method',
					'protected-decorated-method',
					'public-decorated-method',
					'decorated-method',

					'private-instance-method',
					'protected-instance-method',
					'public-instance-method',

					'private-method',
					'protected-method',
					'public-method',

					'instance-method',

					'method',
				],
			},
		],
	},
};
