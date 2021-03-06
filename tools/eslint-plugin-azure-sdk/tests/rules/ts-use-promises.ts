/**
 * @file Testing the ts-use-promises rule.
 * @author Arpan Laha
 */

import rule from "../../src/rules/ts-use-promises";
import { RuleTester } from "eslint";

//------------------------------------------------------------------------------
// Example files
//------------------------------------------------------------------------------

const example = `
const promise = (): Promise<string> => {
    return new Promise(resolve => resolve("example"));
}
`;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    createDefaultProgram: true,
    ecmaFeatures: {
      modules: true
    },
    ecmaVersion: 6,
    project: "./tsconfig.json",
    sourceType: "module"
  }
});

ruleTester.run("ts-use-promises", rule, {
  valid: [
    {
      code: example
    }
  ],
  invalid: [
    {
      code: `import Promise from 'bluebird';${example}`,
      errors: [
        {
          message:
            "promises should use the in-built Promise type, not libraries or polyfills"
        }
      ]
    }
  ]
});
