module.exports = {
    description: 'Creates a new component',
    prompts: [
        {
            type: 'list',
            name: 'componentType',
            message: 'Component type: ',
            choices: [
                'admin',
                'common',
                'layout',
                'store'
            ]
        },
        {
            type: 'input',
            name: 'name',
            message: 'Component name: '
        }
    ],
    actions: [
        // component
        {
            type: 'add',
            path: '../src/components/{{componentType}}/{{pascalCase name}}.tsx',
            templateFile: 'templates/component/component.tsx.hbs'
        },
        // storybook
        {
            type: 'add',
            path: '../src/stories/{{componentType}}/{{pascalCase name}}.stories.tsx',
            templateFile: 'templates/component/stories.tsx.hbs'
        },
        // tests
        {
            type: 'add',
            path: '../__test__/unit/components/{{componentType}}/{{pascalCase name}}.test.tsx',
            templateFile: 'templates/component/test.tsx.hbs'
        }
    ]
};