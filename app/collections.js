import Backbone from 'backbone'

let UsersCollection = Backbone.Collection.extend({
    url: 'users.json'
});

export {UsersCollection}