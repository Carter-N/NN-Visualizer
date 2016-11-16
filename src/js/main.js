//Standard shaders
var shaders = {
	fragment: `

		varying lowp vec4 vColor;

		void main(void) {
			gl_FragColor = vColor;
		}
	`,

	vertex: `

		attribute vec3 aVertexPosition;
		attribute vec4 aVertexColor;

		uniform mat4 uMVMatrix;
		uniform mat4 uPMatrix;

		varying lowp vec4 vColor;

		void main(void) {
			gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
			vColor = aVertexColor;
		}
	`
};

//Network graph context
var networkGraph = new WebGLContext("network-graph", shaders);

var dataset = new Dataset(80, function(x){return Math.sin(Math.PI * x) / 2;});
var datasetGraph = new WebGLContext("dataset-graph", shaders, 600, 400);

for(var point of dataset.points){

	var color;

	if(point.class === 1)color = [1.0, 0.0, 0.0, 1.0];
	if(point.class === 0)color = [0.0, 0.0, 1.0, 1.0];

	var box = datasetGraph.renderer.createBox(
		point.x * 12, 
		point.y * 8,
		0.25, 
		0.25, 
		color
	);
}

var frames = 0;

function loop(){
	requestAnimationFrame(loop);

	frames++;

	//Update logic

	networkGraph.render();
	datasetGraph.render();
}

var foo = turbojs.alloc(1e3);

for(var i = 0; i < 1e3; i++)foo[i] = i;



loop();