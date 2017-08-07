const TYPE = {
    array_like: Symbol("array_like"),
    object: Symbol("object"),
    others: Symbol("others")
}

function determineType(list) {
    if (list.length !== undefined) {
        return TYPE.array_like;
    } else if (list !== null && typeof list === "object") {
        return TYPE.object;
    } else
        return TYPE.others;
}

function each(list, iteratee, context) {
    var bindedIteratee = iteratee;
    if (context !== undefined) {
        bindedIteratee = iteratee.bind(context);
    }
    switch (determineType(list)) {
        case TYPE.array_like:
            for (let i = 0; i < list.length; i++) {
                bindedIteratee(list[i], i, list);
            }
            break;
        case TYPE.object:
            for (let key in list) {
                bindedIteratee(list[key], key, list);
            }
            break;
        case TYPE.others:
        default:
            return;
    }
}

function map(list, iteratee, context) {
    var bindedIteratee = iteratee,
        returnArray = [];
    if (context !== undefined) {
        bindedIteratee = iteratee.bind(context);
    }
    switch (determineType(list)) {
        case TYPE.array_like:
            for (let i = 0; i < list.length; i++) {
                returnArray.push(bindedIteratee(list[i]));
            }
            break;
        case TYPE.object:
            for (let key in list) {
                returnArray.push(bindedIteratee(list[i]));
            }
            break;
        case TYPE.others:
        default:
            break;
    }
    return returnArray;
}

function gh(params) {

}