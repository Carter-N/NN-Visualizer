"use strict";

//Standard shaders
var shaders = {
	fragment: "\n\n\t\tvarying lowp vec4 vColor;\n\n\t\tvoid main(void) {\n\t\t\tgl_FragColor = vColor;\n\t\t}\n\t",

	vertex: "\n\n\t\tattribute vec3 aVertexPosition;\n\t\tattribute vec4 aVertexColor;\n\n\t\tuniform mat4 uMVMatrix;\n\t\tuniform mat4 uPMatrix;\n\n\t\tvarying lowp vec4 vColor;\n\n\t\tvoid main(void) {\n\t\t\tgl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n\t\t\tvColor = aVertexColor;\n\t\t}\n\t"
};

//Network graph context
var networkGraph = new WebGLContext("network-graph", shaders);

var dataset = new Dataset(80, function (x) {
	return Math.sin(Math.PI * x) / 2;
});
var datasetGraph = new WebGLContext("dataset-graph", shaders, 600, 400);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = dataset.points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var point = _step.value;


		var color;

		if (point.class === 1) color = [1.0, 0.0, 0.0, 1.0];
		if (point.class === 0) color = [0.0, 0.0, 1.0, 1.0];

		var box = datasetGraph.renderer.createBox(point.x * 12, point.y * 8, 0.25, 0.25, color);
	}
} catch (err) {
	_didIteratorError = true;
	_iteratorError = err;
} finally {
	try {
		if (!_iteratorNormalCompletion && _iterator.return) {
			_iterator.return();
		}
	} finally {
		if (_didIteratorError) {
			throw _iteratorError;
		}
	}
}

var frames = 0;

function loop() {
	requestAnimationFrame(loop);

	frames++;

	//Update logic

	networkGraph.render();
	datasetGraph.render();
}

loop();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsic2hhZGVycyIsImZyYWdtZW50IiwidmVydGV4IiwibmV0d29ya0dyYXBoIiwiV2ViR0xDb250ZXh0IiwiZGF0YXNldCIsIkRhdGFzZXQiLCJ4IiwiTWF0aCIsInNpbiIsIlBJIiwiZGF0YXNldEdyYXBoIiwicG9pbnRzIiwicG9pbnQiLCJjb2xvciIsImNsYXNzIiwiYm94IiwicmVuZGVyZXIiLCJjcmVhdGVCb3giLCJ5IiwiZnJhbWVzIiwibG9vcCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBLElBQUlBLFVBQVU7QUFDYkMsZ0hBRGE7O0FBVWJDO0FBVmEsQ0FBZDs7QUEyQkE7QUFDQSxJQUFJQyxlQUFlLElBQUlDLFlBQUosQ0FBaUIsZUFBakIsRUFBa0NKLE9BQWxDLENBQW5COztBQUVBLElBQUlLLFVBQVUsSUFBSUMsT0FBSixDQUFZLEVBQVosRUFBZ0IsVUFBU0MsQ0FBVCxFQUFXO0FBQUMsUUFBT0MsS0FBS0MsR0FBTCxDQUFTRCxLQUFLRSxFQUFMLEdBQVVILENBQW5CLElBQXdCLENBQS9CO0FBQWtDLENBQTlELENBQWQ7QUFDQSxJQUFJSSxlQUFlLElBQUlQLFlBQUosQ0FBaUIsZUFBakIsRUFBa0NKLE9BQWxDLEVBQTJDLEdBQTNDLEVBQWdELEdBQWhELENBQW5COzs7Ozs7O0FBRUEsc0JBQWlCSyxRQUFRTyxNQUF6Qiw4SEFBZ0M7QUFBQSxNQUF4QkMsS0FBd0I7OztBQUUvQixNQUFJQyxLQUFKOztBQUVBLE1BQUdELE1BQU1FLEtBQU4sS0FBZ0IsQ0FBbkIsRUFBcUJELFFBQVEsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsR0FBaEIsQ0FBUjtBQUNyQixNQUFHRCxNQUFNRSxLQUFOLEtBQWdCLENBQW5CLEVBQXFCRCxRQUFRLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLENBQVI7O0FBRXJCLE1BQUlFLE1BQU1MLGFBQWFNLFFBQWIsQ0FBc0JDLFNBQXRCLENBQ1RMLE1BQU1OLENBQU4sR0FBVSxFQURELEVBRVRNLE1BQU1NLENBQU4sR0FBVSxDQUZELEVBR1QsSUFIUyxFQUlULElBSlMsRUFLVEwsS0FMUyxDQUFWO0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCxJQUFJTSxTQUFTLENBQWI7O0FBRUEsU0FBU0MsSUFBVCxHQUFlO0FBQ2RDLHVCQUFzQkQsSUFBdEI7O0FBRUFEOztBQUVBOztBQUVBakIsY0FBYW9CLE1BQWI7QUFDQVosY0FBYVksTUFBYjtBQUNBOztBQUVERiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9TdGFuZGFyZCBzaGFkZXJzXHJcbnZhciBzaGFkZXJzID0ge1xyXG5cdGZyYWdtZW50OiBgXHJcblxyXG5cdFx0dmFyeWluZyBsb3dwIHZlYzQgdkNvbG9yO1xyXG5cclxuXHRcdHZvaWQgbWFpbih2b2lkKSB7XHJcblx0XHRcdGdsX0ZyYWdDb2xvciA9IHZDb2xvcjtcclxuXHRcdH1cclxuXHRgLFxyXG5cclxuXHR2ZXJ0ZXg6IGBcclxuXHJcblx0XHRhdHRyaWJ1dGUgdmVjMyBhVmVydGV4UG9zaXRpb247XHJcblx0XHRhdHRyaWJ1dGUgdmVjNCBhVmVydGV4Q29sb3I7XHJcblxyXG5cdFx0dW5pZm9ybSBtYXQ0IHVNVk1hdHJpeDtcclxuXHRcdHVuaWZvcm0gbWF0NCB1UE1hdHJpeDtcclxuXHJcblx0XHR2YXJ5aW5nIGxvd3AgdmVjNCB2Q29sb3I7XHJcblxyXG5cdFx0dm9pZCBtYWluKHZvaWQpIHtcclxuXHRcdFx0Z2xfUG9zaXRpb24gPSB1UE1hdHJpeCAqIHVNVk1hdHJpeCAqIHZlYzQoYVZlcnRleFBvc2l0aW9uLCAxLjApO1xyXG5cdFx0XHR2Q29sb3IgPSBhVmVydGV4Q29sb3I7XHJcblx0XHR9XHJcblx0YFxyXG59O1xyXG5cclxuLy9OZXR3b3JrIGdyYXBoIGNvbnRleHRcclxudmFyIG5ldHdvcmtHcmFwaCA9IG5ldyBXZWJHTENvbnRleHQoXCJuZXR3b3JrLWdyYXBoXCIsIHNoYWRlcnMpO1xyXG5cclxudmFyIGRhdGFzZXQgPSBuZXcgRGF0YXNldCg4MCwgZnVuY3Rpb24oeCl7cmV0dXJuIE1hdGguc2luKE1hdGguUEkgKiB4KSAvIDI7fSk7XHJcbnZhciBkYXRhc2V0R3JhcGggPSBuZXcgV2ViR0xDb250ZXh0KFwiZGF0YXNldC1ncmFwaFwiLCBzaGFkZXJzLCA2MDAsIDQwMCk7XHJcblxyXG5mb3IodmFyIHBvaW50IG9mIGRhdGFzZXQucG9pbnRzKXtcclxuXHJcblx0dmFyIGNvbG9yO1xyXG5cclxuXHRpZihwb2ludC5jbGFzcyA9PT0gMSljb2xvciA9IFsxLjAsIDAuMCwgMC4wLCAxLjBdO1xyXG5cdGlmKHBvaW50LmNsYXNzID09PSAwKWNvbG9yID0gWzAuMCwgMC4wLCAxLjAsIDEuMF07XHJcblxyXG5cdHZhciBib3ggPSBkYXRhc2V0R3JhcGgucmVuZGVyZXIuY3JlYXRlQm94KFxyXG5cdFx0cG9pbnQueCAqIDEyLCBcclxuXHRcdHBvaW50LnkgKiA4LFxyXG5cdFx0MC4yNSwgXHJcblx0XHQwLjI1LCBcclxuXHRcdGNvbG9yXHJcblx0KTtcclxufVxyXG5cclxudmFyIGZyYW1lcyA9IDA7XHJcblxyXG5mdW5jdGlvbiBsb29wKCl7XHJcblx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG5cclxuXHRmcmFtZXMrKztcclxuXHJcblx0Ly9VcGRhdGUgbG9naWNcclxuXHJcblx0bmV0d29ya0dyYXBoLnJlbmRlcigpO1xyXG5cdGRhdGFzZXRHcmFwaC5yZW5kZXIoKTtcclxufVxyXG5cclxubG9vcCgpOyJdfQ==
