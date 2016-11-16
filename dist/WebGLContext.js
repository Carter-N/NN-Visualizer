"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//A wrapper around a canvas element with rendering functions
var WebGLContext = function () {
	function WebGLContext(id) {
		var shaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
		var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.innerWidth;
		var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : window.innerHeight;

		_classCallCheck(this, WebGLContext);

		this.id = id;
		this.canvas = document.getElementById(this.id);
		this.canvas.width = width;
		this.canvas.height = height;
		this.gl = this.canvas.getContext("webgl");
		this.scene = null;
		this.renderer = new WebGLRenderer(this, shaders);
	}

	_createClass(WebGLContext, [{
		key: "getWidth",
		value: function getWidth() {
			return this.canvas.width;
		}
	}, {
		key: "getHeight",
		value: function getHeight() {
			return this.canvas.height;
		}
	}, {
		key: "render",
		value: function render() {
			this.renderer.render();
		}
	}]);

	return WebGLContext;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIldlYkdMQ29udGV4dC5qcyJdLCJuYW1lcyI6WyJXZWJHTENvbnRleHQiLCJpZCIsInNoYWRlcnMiLCJ3aWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnbCIsImdldENvbnRleHQiLCJzY2VuZSIsInJlbmRlcmVyIiwiV2ViR0xSZW5kZXJlciIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7SUFDTUEsWTtBQUVMLHVCQUFZQyxFQUFaLEVBQXVGO0FBQUEsTUFBdkVDLE9BQXVFLHVFQUE3RCxJQUE2RDtBQUFBLE1BQXZEQyxLQUF1RCx1RUFBL0NDLE9BQU9DLFVBQXdDO0FBQUEsTUFBNUJDLE1BQTRCLHVFQUFuQkYsT0FBT0csV0FBWTs7QUFBQTs7QUFDdEYsT0FBS04sRUFBTCxHQUFVQSxFQUFWO0FBQ0EsT0FBS08sTUFBTCxHQUFjQyxTQUFTQyxjQUFULENBQXdCLEtBQUtULEVBQTdCLENBQWQ7QUFDQSxPQUFLTyxNQUFMLENBQVlMLEtBQVosR0FBb0JBLEtBQXBCO0FBQ0EsT0FBS0ssTUFBTCxDQUFZRixNQUFaLEdBQXFCQSxNQUFyQjtBQUNBLE9BQUtLLEVBQUwsR0FBVSxLQUFLSCxNQUFMLENBQVlJLFVBQVosQ0FBdUIsT0FBdkIsQ0FBVjtBQUNBLE9BQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0EsT0FBS0MsUUFBTCxHQUFnQixJQUFJQyxhQUFKLENBQWtCLElBQWxCLEVBQXdCYixPQUF4QixDQUFoQjtBQUNBOzs7OzZCQUVTO0FBQ1QsVUFBTyxLQUFLTSxNQUFMLENBQVlMLEtBQW5CO0FBQ0E7Ozs4QkFFVTtBQUNWLFVBQU8sS0FBS0ssTUFBTCxDQUFZRixNQUFuQjtBQUNBOzs7MkJBRU87QUFDUCxRQUFLUSxRQUFMLENBQWNFLE1BQWQ7QUFDQSIsImZpbGUiOiJXZWJHTENvbnRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0Egd3JhcHBlciBhcm91bmQgYSBjYW52YXMgZWxlbWVudCB3aXRoIHJlbmRlcmluZyBmdW5jdGlvbnNcclxuY2xhc3MgV2ViR0xDb250ZXh0e1xyXG5cclxuXHRjb25zdHJ1Y3RvcihpZCwgc2hhZGVycyA9IG51bGwsIHdpZHRoID0gd2luZG93LmlubmVyV2lkdGgsIGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCl7XHJcblx0XHR0aGlzLmlkID0gaWQ7XHJcblx0XHR0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpO1xyXG5cdFx0dGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcclxuXHRcdHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuXHRcdHRoaXMuZ2wgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2xcIik7XHJcblx0XHR0aGlzLnNjZW5lID0gbnVsbDtcclxuXHRcdHRoaXMucmVuZGVyZXIgPSBuZXcgV2ViR0xSZW5kZXJlcih0aGlzLCBzaGFkZXJzKTtcclxuXHR9XHJcblxyXG5cdGdldFdpZHRoKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jYW52YXMud2lkdGg7XHJcblx0fVxyXG5cclxuXHRnZXRIZWlnaHQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNhbnZhcy5oZWlnaHQ7XHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdHRoaXMucmVuZGVyZXIucmVuZGVyKCk7XHJcblx0fVxyXG59Il19
