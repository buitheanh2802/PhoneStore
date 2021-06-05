import firebase from './../apis/firebaseClient';
const redux = require('redux');
const Oldstate = {
    idDataForFirebase: '',
    issetUser: false,
    realTimeComment: false,
    onLoad : false
}
const allReducer = (state = Oldstate, action) => {
    switch (action.type) {
        case "POST__DATO_TO_FIREBASE":
            {
                const data = firebase.database().ref('User');
                data.push(action.data);
                break;
            }
        case "CHANE__ISSETUSER":
            {
                return { ...state, issetUser: action.flag }
            }
        case "POST__COMMENT":
            {
                const allComment = firebase.database().ref('Products');
                const dataArr = [];
                allComment.once('value').then(dataSnapShot => {
                    dataArr.push(action.data);
                    dataSnapShot.forEach(value => {
                        if (value.key === action.idProduct) {
                            if (value.val().commentBy) {
                                value.val().commentBy.forEach(value => {
                                    dataArr.push(value);
                                })
                            }
                        }
                    });        
                }).then(() =>
                {
                    const data = firebase.database().ref('Products');
                    data.child(action.idProduct).update({
                        commentBy: dataArr
                    });   
                });
                break;
            }
        case "REALTIME__COMMENT":
            {
                return { ...state, realTimeComment: action.change }
            }
        default:
            return state
    }
    return state;
}
const store = redux.createStore(allReducer);

// store.subscribe(() => {
//     console.log(store.getState());
// })
export default store;