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
            path: "../src/controller/{{kebabCase name}}.controller.ts",
            templateFile: "templates/controller/controller.ts.hbs"
        },
        // tests
        {
            type: "add",
            path: "../__test__/unit/controller/{{kebabCase name}}.controller.test.ts",
            templateFile: "templates/controller/test.controller.ts.hbs"
        },
        // validation
        {
            type: "add",
            path: "../src/lib/validator/{{kebabCase name}}.validator.ts",
            templateFile: "templates/controller/validator.ts.hbs"
        }
    ]
}