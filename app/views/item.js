app.TodoView = Backbone.View.extend({
  tagName: 'li',

  template: _.template($('#item-template').html()),

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.input = this.$('.edit');

    return this;
  },

  initialize: function() {
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this)
  },

  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close',
    'click .toggle': 'toggleCompleted',
    'click .destroy': 'destroy'
  },

  edit: function() {
    this.$el.addClass('editing');
    this.input.focus();
  },

  close: function() {
    var value = this.input.val().trim();

    if (value) {
      this.model.save({description: value});
    }

    this.$el.removeClass('editing');
  },

  updateOnEnter: function(event) {
    if (event.which === 13) {
      this.close();
    }
  },

  toggleCompleted: function() {
    this.model.toggle();
  },

  destroy: function() {
    this.model.destroy();
  }
});