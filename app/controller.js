import _ from 'underscore'
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'

import UserAdmin from './app'
import {IndexView, userItemView, UserListView, UserLayoutView, UserSummaryView, UserDetailView} from './views'

export default Marionette.Controller.extend({
    showIndex() {
        UserAdmin.mainRegion.show(new IndexView());
    },

    showUserListView() {
        let userListView = new UserListView({collection: UserAdmin.Users})
        UserAdmin.mainRegion.show(userListView)
        UserAdmin.Router.navigate('users')
    },

    showUserDetail(id) {
        let user = UserAdmin.Users.get(id)

        let layout = new UserLayoutView({model: user});
        UserAdmin.mainRegion.show(layout)
        layout.summary.show(new UserSummaryView({model: user}))
        layout.detail.show(new UserDetailView({model: user}))
        UserAdmin.Router.navigate('users/'+id)
    }

});