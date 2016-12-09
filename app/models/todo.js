app.Todo = Backbone.Model.extend({
  defaults: {
    description: '',
    completed: false
  },

  toggle: function() {
    this.save({completed: !this.completed});
  }
});

app.TodoList = Backbone.Collection.extend({
  model: app.Todo,
  localStorage: new Store('backbone-todo')
});

app.todoList = new app.TodoList();