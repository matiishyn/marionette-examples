import _ from 'underscore'
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'

// templates
import indexTmpl from './templates/index.html'
import userDetailLayoutTmpl from './templates/user-datail-layout-tmpl.html'
import summaryTmpl from './templates/summary-tmpl.html'
import detailTmpl from './templates/detail-tmpl.html'

let testData = [
    {email: 'sefdsf0',id:0},
    {email: 'sefdsf1',id:1},
    {email: 'sefdsf2',id:2},
    {email: 'sefdsf3',id:3}
]

let UserAdmin = new Marionette.Application();

let UsersCollection = Backbone.Collection.extend({
    url: 'users.json'
});

let AppController = Marionette.Controller.extend({
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

let AppRouter = Backbone.Router.extend({
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

UserAdmin.addInitializer(function () {
    UserAdmin.addRegions({
        mainRegion: '#app'
    });
    UserAdmin.AppController = new AppController();
    UserAdmin.Router = new AppRouter();
    UserAdmin.Users = new UsersCollection(testData);
    Backbone.history.start();
});

let IndexView = Marionette.ItemView.extend({
    template: indexTmpl,
    events: {
        'click #link1': 'showUserList'
    },
    showUserList(e) {
        e.preventDefault();
        UserAdmin.AppController.showUserListView()

    }
});

let userItemView = Marionette.ItemView.extend({
    tagName: 'tr',
    template: _.template(`<td><a href="#"><%=email%></a></td>`),
    events: {
        'click a': 'showUserDetail'
    },
    showUserDetail(e) {
        e.preventDefault();
        UserAdmin.AppController.showUserDetail(this.model.id)
    }
})

let UserListView = Marionette.CollectionView.extend({
    tagName: 'table',
    className: 'table table-striped',
    childView: userItemView,
    onBeforeRender() {
        this.$el.append(`<h1>Users</h1>`)
    }
})

let UserLayoutView = Marionette.LayoutView.extend({
    template: userDetailLayoutTmpl,
    regions: {
        summary: '#summary',
        detail: '#detail'
    }
});

let UserSummaryView = Marionette.ItemView.extend({
    template: summaryTmpl
})

let UserDetailView = Marionette.ItemView.extend({
    template: detailTmpl
})

UserAdmin.start()