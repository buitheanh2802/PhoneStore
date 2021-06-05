import firebase from './firebaseClient';

const productApi = 
{
    fetchAll : () =>
    {
        return firebase.database().ref('Products').once('value').then(data =>
        {
            const field = [];
            data.forEach(item => { field.push(item.val())})
            return field;
        })
    },
    fetchUrl : (path) =>
    {
        return firebase.storage().ref(path).getDownloadURL();
    }
}

export default productApi;