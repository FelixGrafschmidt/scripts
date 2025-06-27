import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import globals from "globals";

const config: FlatConfig.ConfigArray = [
	js.configs.recommended,
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			globals: globals.node,
			parser: tsParser,
			parserOptions: {
				project: "./tsconfig.json",
				sourceType: "module",
			},
		},
		plugins: {
			"@typescript-eslint": tseslint,
			prettier: pluginPrettier,
		},
		rules: {
			...tseslint.configs.recommended.rules,
			...prettier.rules,
			"prettier/prettier": "error",
			"no-console": "off",
			"no-debug": "off",
		},
	},
	{
		ignores: ["dist/"],
	},
];

export default config;
