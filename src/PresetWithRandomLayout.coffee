(($$) ->
  class PresetWithRandomLayout
    defaults:
      positions: undefined # map of (node id) => (position obj); or function(node){ return somPos; }
      zoom: undefined # the zoom level to set (prob want fit = false if set)
      pan: undefined # the pan level to set (prob want fit = false if set)
      fit: true # whether to fit to viewport
      padding: 30 # padding on fit
      animate: false # whether to transition the node positions
      animationDuration: 500 # duration of animation in ms if enabled
      ready: undefined # callback on layoutready
      stop: undefined # callback on layoutstop

    constructor: (options) ->
      @options = $$.util.extend(true, {}, @defaults, options)

    run: ->
      options = @options
      cy = @options.cy
      eles = @options.eles
      nodes = eles.nodes()
      posIsFn = $$.is.fn(options.positions)

      getPosition = (node) ->
        if node.data('hasPosition')
          return null

        if options.positions == null
          return null

        if posIsFn
          return @options.positions.apply( node, [ node ] )

        if options.positions
          pos = options.positions[node._private.data.id]
        else
          pos = null

        if pos == null
          if options.boundingBox
            box = options.boundingBox
          else
            box =
              x1: 0
              y1: 0
              w: cy.width()
              h: cy.height()
          bb = $$.util.makeBoundingBox(box)

          return {
          x: bb.x1 + Math.round(Math.random() * bb.w),
          y: bb.y1 + Math.round(Math.random() * bb.h)
          }

        return pos;

      nodes.layoutPositions(@, options, (i, node) ->
        position = getPosition(node)

        if position == null
          return false

        return position;
      )

      return @ # chaining

  $$(
    'layout',
    'presetWithRandom',
    PresetWithRandomLayout
  )
)(cytoscape)
