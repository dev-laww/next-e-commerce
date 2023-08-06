const { component } = require('./settings');

module.exports = function (plop) {
    plop.setGenerator('component', component);
};