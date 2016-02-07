import Backbone from 'backbone'

import UserAdmin from './app'

export default Backbone.Router.extend({
    routes: {
        "": "showIndex",
        'users': 'showUserList',
        'users/:id': 'showUserDetail'
    },
    showIndex() {
        UserAdmin.AppController.showIndex();
    },
    showUserList() {
        UserAdmin.AppController.showUserListView()
    },
    showUserDetail(id) {
        UserAdmin.AppController.showUserDetail(id)
    }
});
