module.exports = (schema) => {

    schema.mixedFunction = function (name, func) {
        schema.statics[name] = func;
        schema.methods[name] = function () {
            var args = [].slice.call(arguments);
            args.unshift(this);
            return func.apply(null, args);
        };

        return true;
    };

    schema.mixed = new Proxy({}, {
        get : function (target, name, receiver) {
            return schema.mixedFunction;
        },
        set : function (target, property, func, receiver) {
            return schema.mixedFunction(property, func);
        }
    });

};
