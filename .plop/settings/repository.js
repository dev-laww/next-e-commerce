/** @type {import('plop').PlopGeneratorConfig}*/
module.exports = {
    description: 'Creates a new repository',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'Repository name: '
        }
    ],
    actions: [
        // repository
        {
            type: 'add',
            path: '../src/repository/{{kebabCase name}}.repo.ts',
            templateFile: 'templates/repository/repository.ts.hbs'
        },
        // tests
        {
            type: 'add',
            path: '../__test__/unit/repository/{{kebabCase name}}.repo.test.ts',
            templateFile: 'templates/repository/test.repository.ts.hbs'
        }
    ]
}