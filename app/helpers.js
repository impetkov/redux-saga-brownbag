export const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export const dispatchAction = (dispatch, action) => {
    console.log('About to dispatch action...');
    const promise = sleep(2000);

    promise.then(() => {
        console.log(`Dispatching action ${action.type}...`);
        dispatch(action);
    });
};