import _ from 'underscore'
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'

import UserAdmin from './app'
import AppRouter from './router'
import AppController from './controller'
import {UsersCollection} from './collections'

let testData = [
    {email: 'sefdsf0', id: 0},
    {email: 'sefdsf1', id: 1},
    {email: 'sefdsf2', id: 2},
    {email: 'sefdsf3', id: 3}
]


UserAdmin.addInitializer(function () {
    UserAdmin.addRegions({
        mainRegion: '#app'
    });
    UserAdmin.AppController = new AppController();
    UserAdmin.Router = new AppRouter();
    UserAdmin.Users = new UsersCollection(testData);
    Backbone.history.start();
});

UserAdmin.start()