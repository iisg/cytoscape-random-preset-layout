(function($$, $) {
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

    PresetWithRandomLayout.prototype.makeBoundingBox = function(bb) {
      if (bb.x1 !== null && bb.y1 !== null) {
        if (bb.x2 !== null && bb.y2 !== null && bb.x2 >= bb.x1 && bb.y2 >= bb.y1) {
          return {
            x1: bb.x1,
            y1: bb.y1,
            x2: bb.x2,
            y2: bb.y2,
            w: bb.x2 - bb.x1,
            h: bb.y2 - bb.y1
          };
        } else if (bb.w !== null && bb.h !== null && bb.w >= 0 && bb.h >= 0) {
          return {
            x1: bb.x1,
            y1: bb.y1,
            x2: bb.x1 + bb.w,
            y2: bb.y1 + bb.h,
            w: bb.w,
            h: bb.h
          };
        }
      }
    };

    function PresetWithRandomLayout(options) {
      this.options = $.extend(true, {}, this.defaults, options);
    }

    PresetWithRandomLayout.prototype.run = function() {
      var cy, eles, getPosition, nodes, options, posIsFn;
      options = this.options;
      cy = this.options.cy;
      eles = this.options.eles;
      nodes = eles.nodes();
      posIsFn = $.isFunction(options.positions);
      getPosition = (function(_this) {
        return function(node) {
          var bb, box, pos;
          if (node.data('hasPosition')) {
            return null;
          }
          if (options.positions === null) {
            return null;
          }
          if (posIsFn) {
            return _this.options.positions.apply(node, [node]);
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
            bb = _this.makeBoundingBox(box);
            return {
              x: bb.x1 + Math.round(Math.random() * bb.w),
              y: bb.y1 + Math.round(Math.random() * bb.h)
            };
          }
          return pos;
        };
      })(this);
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
})(cytoscape, jQuery);
