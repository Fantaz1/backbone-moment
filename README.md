backbone-moment
=================

Simple wrapper for moment.js on backbone models

Usage
--------

```
class Shift extends Backbone.RelationModel
  initialize: ->
    hasTime 'start_at'
    hasTime 'end_at', name: 'startDate'
```

###### options:
  + **name** (default: camelize from key value) - variable name
  + **format** (default: 'MM-DD-YYYY HH:mm:ss') - datetime format
  + **default** (default: current time) - time by default
  + **init** (default: true) - init time variable with default value even if json is empty

### Example:

  ```
  class Shift extends Backbone.RelationModel
    initialize: ->
      hasTime 'start_at', init: false
      hasTime 'end_at', name: 'startDate', defaul: '01-01-2014 10:00:00'

  shift = new Shift({start_at: '05-10-2014 14:00:00'})
  shift.startAt # => moment - 05-10-2014 14:00:00
  shift.endAt   # => moment - 01-01-2014 10:00:00

  shift = new Shift({end_at: '05-10-2014 14:00:00'})
  shift.startAt # => undefine
  shift.endAt   # => moment - current time

  shift.set(start_at: '06-20-2013 15:00:00')
  shift.startAt # => moment - 06-20-2013 15:00:00

  ```