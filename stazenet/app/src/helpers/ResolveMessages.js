export const warning = message => {
    return { message, type: 'warning' };
};

export const error = message => {
    return { message, type: 'error' };
};

export const info = message => {
    return { message, type: 'info' };
};
