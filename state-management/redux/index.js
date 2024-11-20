function createStore(reducer){
    let state;
    const listeners = [];

    return {
        getState() {
            return state;
        },
        dispatch(action){
            state = reducer(state, action); 
            listeners.forEach(listener => listener());
        },
        subscribe(listner){
            listeners.push(listner);
            return () => {
                const index = listeners.indexOf(listner);
                if(index !== -1){
                    listeners.splice(index, 1);
                }   
            }
        }
    }
}

const intialState = {
    count: 0
}
function counterReducer(state = intialState, action ){
    switch(action.type){
        case "INCREMENT": {
            return { count: state.count + 1 }
        };
        case "DECREMENT": {
            return { count: state.count - 1 }
        }
        case "RESET": {
            return { count: 0 }
        }
        default: 
            return state;
    }
}


const store = createStore(counterReducer);


const unsubscribe = store.subscribe( () => {
    console.log('State changed:', store.getState());

});


store.dispatch({action: "INCREMENT"})
store.dispatch({action: "INCREMENT"})
store.dispatch({action: "INCREMENT"})
store.dispatch({action: "DECREMENT"})
store.dispatch({action: "RESET"});

unsubscribe();