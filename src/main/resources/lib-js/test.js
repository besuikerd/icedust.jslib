var _ = require('lodash');
var generated = require('./test.generated');
var views = require('./views.generated');
var _pixiedustRuntime = require('./lib/pixiedust-runtime');

var mergedModule = _.assign({}, generated, views);

var result = _pixiedustRuntime.pixiedustRunner(mergedModule);
module.exports = result;