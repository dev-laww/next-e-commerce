const { component, controller } = require('./settings');

/** @type {import('plop').NodePlopAPI}*/
module.exports = function (plop) {
    plop.setGenerator('component', component);
    plop.setGenerator('controller', controller);
};