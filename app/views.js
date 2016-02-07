import _ from 'underscore'
import Marionette from 'backbone.marionette'

import UserAdmin from './app'

// templates
import indexTmpl from './templates/index.html'
import userDetailLayoutTmpl from './templates/user-datail-layout-tmpl.html'
import summaryTmpl from './templates/summary-tmpl.html'
import detailTmpl from './templates/detail-tmpl.html'

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

export {IndexView, userItemView, UserListView, UserLayoutView, UserSummaryView, UserDetailView}