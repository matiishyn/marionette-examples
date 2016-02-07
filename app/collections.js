import _ from 'underscore'
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'

let UsersCollection = Backbone.Collection.extend({
    url: 'users.json'
});

export {UsersCollection}