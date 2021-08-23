function convertActionNameToType(actionName) {
    return actionName.replace(/([A-Z])/g, "_$1").toUpperCase();
}


export const actions = new Proxy(
    {},
    {
        get: function (target, prop) {
            if (target[prop] == undefined) {
                return function (args) {
                    var action={
                        type: convertActionNameToType(prop),
                        payload: args
                    };
                    return action;
                }
            }
            else return target[prop];
        }
    }
)