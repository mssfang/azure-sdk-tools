/**
 * @file Testing the ts-naming-options rule.
 * @author Arpan Laha
 */

import rule from "../../src/rules/ts-naming-options";
import { RuleTester } from "eslint";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    createDefaultProgram: true,
    project: "./tsconfig.json"
  }
});

ruleTester.run("ts-naming-options", rule, {
  valid: [
    // single method
    {
      code:
        "class ExampleClient { createExample(options: CreateExampleOptions) {}; };"
    },
    // multiple methods
    {
      code:
        "class ExampleClient { createExample(options: CreateExampleOptions) {}; upsertExample(options: UpsertExampleOptions) {}; };"
    },
    // not a client
    {
      code: "class Example { createExample(options: Options) {}; };"
    }
  ],
  invalid: [
    {
      code: "class ExampleClient { createExample(options: Options) {}; };",
      errors: [
        {
          message: "options parameter type is not prefixed with the method name"
        }
      ]
    }
  ]
});
