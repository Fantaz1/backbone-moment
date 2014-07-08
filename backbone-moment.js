var camelize = function(str) {
  str = str.replace(/(?:^|[-_])(\w)/g, function(a, c) {
    if (c) {
      return c.toUpperCase();
    } else {
      return '';
    }
  });
  return str.charAt(0).toLowerCase() + str.substr(1);
};

Backbone.MomentModel = Backbone.Model.extend({
  defaultTimeOptions: {
    format: 'MM-DD-YYYY HH:mm',
    init: true
  },

  _defaultTimeValue: function(value) {
    if (value !== null) {
      return this._timeParser(value);
    } else {
      return moment();
    }
  },

  _timeParser: function(str, format) {
    return moment(str, format);
  },

  hasTime: function(key, options) {
    var name, parse;

    options = _.extend(_.clone(this.defaultTimeOptions), options || {});

    name = options.name ? options.name : camelize(key);
    parse = (function(_this) {
      return function() {
        if (_this.has(key)) {
          _this[name] = _this._timeParser(_this.get(key), options.format);
        } else {
          if (options.init === true) {
            _this[name] = _this._defaultTimeValue(options["default"]);
          }
        }

        if (options.callback){
          options.callback(_this[name]);
        }
      };
    })(this);

    this.on("change:" + key, parse, this);

    parse();
  }
})
