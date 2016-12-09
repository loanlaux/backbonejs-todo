app.AppView = Backbone.View.extend({
  el: '#todo-app',

  initialize: function() {
    this.input = this.$('#new-task');

    app.todoList.on('add', this.addOne, this);
    app.todoList.on('reset', this.addAll, this);
    app.todoList.fetch();
  },

  events: {
    'keypress #new-task': 'createTodoOnEnter'
  },

  createTodoOnEnter: function(event) {
    // Abort if pressed key isn't enter or field is empty
    if (event.which !== 13 || !this.input.val().trim()) {
      return;
    }

    app.todoList.create(this.newAttributes());
    this.input.val('');
  },

  addOne: function(todo) {
    var view = new app.TodoView({model: todo});
    $('#todo-list').append(view.render().el);
  },

  addAll: function() {
    this.$('#todo-list').html('');
    app.todoList.each(this.addOne, this);
  },

  newAttributes: function() {
    return {
      description: this.input.val().trim(),
      completed: false
    };
  }
});

app.appView = new app.AppView();