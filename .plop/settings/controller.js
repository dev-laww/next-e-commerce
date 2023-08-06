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
            path: "../src/controller/name.controller.ts",
            templateFile: "templates/controller/{{name}}.controller.ts.hbs"
        },
        // tests
        {
            type: "add",
            path: "../__test__/unit/controller/{{name}}.controller.test.ts",
            templateFile: "templates/controller/" +
                "test.controller.hbs"
        },
        // validation
        {
            type: "add",
            path: "../src/validation/{{name}}.validation.ts",
            templateFile: "templates/controller/validation.ts.hbs"
        },
        // validation tests
        {
            type: "add",
            path: "../__test__/unit/validation/{{name}}.validation.test.ts",
            templateFile: "templates/controller/test.validation.hbs"
        }
    ]
}