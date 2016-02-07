import Backbone from 'backbone'

import UserAdmin from './app'
import AppRouter from './router'
import AppController from './controller'
import {UsersCollection} from './collections'

let testData = [
    {email: 'user0', id: 0},
    {email: 'user1', id: 1},
    {email: 'user2', id: 2},
    {email: 'user3', id: 3}
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