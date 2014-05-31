camelize = (str)->
  str = str.replace /(?:^|[-_])(\w)/g, (a, c)-> if c then c.toUpperCase() else ''
  str.charAt(0).toLowerCase() + str.substr(1)

class Backbone.MomentModel extends Backbone.Model
  defaultTimeOptions:
    format: 'MM-DD-YYYY HH:mm:ss'
    init: true

  _defaultTimeValue: (default)->
    if default? then @_timeParse(default) else moment()

  _timeParser: (str, format)->
    moment(str, format)

  hasTime: (key, options)->
    options = _.extend @defaultMomentOptions, options

    name = if options.name then options.name else camelize(key)

    parse = =>
      if @has(key)
        @[name] = @_timeParser(@get(key), options.format)
      else
        @[name] = @_defaultTimeValue(options.default) if options.init is true

    @on("change:#{key}", parse, this)

    parse()