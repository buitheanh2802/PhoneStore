import firebase from './firebaseClient';
const categories = 
{
    fetchAll : () =>
    {
        return firebase.database().ref('Categories').once('value')
        .then(data => {
            const list = [];
            data.forEach(item => {
                list.push(item.val());
            })
            return list
        })
    },
    fetchUrl : (path) =>
    {
        return firebase.storage().ref(path).getDownloadURL();
    } 
}
export default categories;