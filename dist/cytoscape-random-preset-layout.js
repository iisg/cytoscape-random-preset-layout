(function($$) {
  var PresetWithRandomLayout;
  PresetWithRandomLayout = (function() {
    PresetWithRandomLayout.prototype.defaults = {
      positions: void 0,
      zoom: void 0,
      pan: void 0,
      fit: true,
      padding: 30,
      animate: false,
      animationDuration: 500,
      ready: void 0,
      stop: void 0
    };

    function PresetWithRandomLayout(options) {
      this.options = $$.util.extend(true, {}, this.defaults, options);
    }

    PresetWithRandomLayout.prototype.run = function() {
      var cy, eles, getPosition, nodes, options, posIsFn;
      options = this.options;
      cy = this.options.cy;
      eles = this.options.eles;
      nodes = eles.nodes();
      posIsFn = $$.is.fn(options.positions);
      getPosition = function(node) {
        var bb, box, pos;
        if (node.data('hasPosition')) {
          return null;
        }
        if (options.positions === null) {
          return null;
        }
        if (posIsFn) {
          return this.options.positions.apply(node, [node]);
        }
        if (options.positions) {
          pos = options.positions[node._private.data.id];
        } else {
          pos = null;
        }
        if (pos === null) {
          if (options.boundingBox) {
            box = options.boundingBox;
          } else {
            box = {
              x1: 0,
              y1: 0,
              w: cy.width(),
              h: cy.height()
            };
          }
          bb = $$.util.makeBoundingBox(box);
          return {
            x: bb.x1 + Math.round(Math.random() * bb.w),
            y: bb.y1 + Math.round(Math.random() * bb.h)
          };
        }
        return pos;
      };
      nodes.layoutPositions(this, options, function(i, node) {
        var position;
        position = getPosition(node);
        if (position === null) {
          return false;
        }
        return position;
      });
      return this;
    };

    return PresetWithRandomLayout;

  })();
  return $$('layout', 'presetWithRandom', PresetWithRandomLayout);
})(cytoscape);
