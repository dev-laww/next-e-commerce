const { component, controller, repository } = require('./settings');

/** @type {import('plop').NodePlopAPI}*/
module.exports = function (plop) {
    plop.setGenerator('component', component);
    plop.setGenerator('controller', controller);
    plop.setGenerator('repository', repository);
};