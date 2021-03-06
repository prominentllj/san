/**
 * @file  事件绑定不存在的 warning
 * @author varsha(wangshuonpu@gmail.com)
 */

var each = require('../util/each');
var warn = require('../util/warn');

// #[begin] error
/**
 * 事件绑定不存在的 warning
 *
 * @param {Object} eventBind 事件绑定对象
 * @param {Component} owner 所属的组件对象
 */
function warnEventListenMethod(eventBind, owner) {
    var valid = true;
    var method = owner;
    each(eventBind.expr.name.paths, function (path) {
        if (!path.value) {
            return false;
        }

        method = method[path.value];
        valid = !!method;
        return valid;
    });

    if (!valid) {
        var paths = [];
        each(eventBind.expr.name.paths, function (path) {
            paths.push(path.value);
        });

        warn(eventBind.name + ' listen fail,"' + paths.join('.') + '" not exist');
    }
}
// #[end]

exports = module.exports = warnEventListenMethod;
