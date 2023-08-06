/** @type {import('plop').PlopGeneratorConfig}*/
module.exports = {
    description: "Creates a new controller",
    prompts: [
        {
            type: "input",
            name: "name",
            message: "Controller name: "
        }
    ],
    actions: [
        // controller
        {
            type: "add",
            path: "../src/controller/{{camelCase name}}.controller.ts",
            templateFile: "templates/controller/controller.ts.hbs"
        },
        // tests
        {
            type: "add",
            path: "../__test__/unit/controller/{{camelCase name}}.controller.test.ts",
            templateFile: "templates/controller/test.controller.ts.hbs"
        },
        // validation
        {
            type: "add",
            path: "../src/lib/validator/{{camelCase name}}.validator.ts",
            templateFile: "templates/controller/validator.ts.hbs"
        },
        // validation tests
        {
            type: "add",
            path: "../__test__/unit/validator/{{camelCase name}}.validator.test.ts",
            templateFile: "templates/controller/test.validator.ts.hbs"
        }
    ]
}