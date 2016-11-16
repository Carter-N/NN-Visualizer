//A renderer that uses a context
class WebGLRenderer{

	constructor(context, shaders){

		//Context refrence
		this.context = context;	
		this.gl = this.context.gl;
		this.scene = [];

		//Shader
		this.shaders = shaders;
		this.shaderProgram = null;

		//Perspective matrix and model view
		this.horizAspect = this.context.getWidth() / this.context.getHeight();
		this.mvMatrix = null;
		this.mvMatrixStack = [];
		this.perspectiveMatrix = null;

		//Shader and model information
		this.attributes = {
			vertexPositionAttribute: null,
			vertexColorAttribute: null
		};

		this.scene = [];
		
		this.init();
	}

	init(){
		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		this.gl.viewport(0, 0, this.context.canvas.width, this.context.canvas.height);

		this.initShaders(
			this.createShader(this.shaders.fragment, "fragment"), 
			this.createShader(this.shaders.vertex, "vertex")
		);
	}

	createShader(shaderSource, shaderType){

		var type;

		if(shaderType == "vertex")type = this.gl.VERTEX_SHADER;
		if(shaderType == "fragment")type = this.gl.FRAGMENT_SHADER;

		var shader = this.gl.createShader(type);

		this.gl.shaderSource(shader, shaderSource);
		this.gl.compileShader(shader);

		if(!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)){  
			alert("An error occurred compiling the shaders: " + this.gl.getShaderInfoLog(shader));  
			this.gl.deleteShader(shader);
			return null;  
		}

		return shader;
	}

	createBox(x, y, width, height, color = [1.0, 1.0, 1.0, 1.0]){
		
		//Vertex buffer
		var vBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vBuffer);
		
		var x0 = x - width / 2,
			x1 = x + width / 2,
			y0 = y - height / 2,
			y1 = y + height / 2;

		var vertices = [
			x1,  y1,  0.0,
			x0, y1,  0.0,
			x1,  y0, 0.0,
			x0, y0, 0.0
		];

		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

		//Color buffer
		var colors = [
			color[0], color[1], color[2], color[3],
			color[0], color[1], color[2], color[3],
			color[0], color[1], color[2], color[3],
			color[0], color[1], color[2], color[3]
		];

		var cBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, cBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.STATIC_DRAW);

		this.scene.push({
			vBuffer: vBuffer,
			cBuffer: cBuffer,
			rotation: 0,
			x: x,
			y: y,
			width: width,
			height: height
		});

		return this.scene[this.scene.length - 1];
	}

	createLine(x0, y0, x1, y1, color = [1.0, 1.0, 1.0, 1.0]){

		var dx = x1 - x0,
			dy = y1 - y0;

		var width = Math.abs(dx),
			height = Math.abs(dy);

		var d = Math.sqrt(dx * dx + dy * dy);

		var line = this.createBox(x0 + dx / 2, y0 + dy / 2, d, 0.025, color);
		line.rotation = Math.atan(dy / dx) * (180 / Math.PI);
	}

	initShaders(fragmentShader, vertexShader){

		//Create shader program
		this.shaderProgram = this.gl.createProgram();

		//Attach shader components
		this.gl.attachShader(this.shaderProgram, vertexShader);
		this.gl.attachShader(this.shaderProgram, fragmentShader);

		//Compile and link shaders to context
		this.gl.linkProgram(this.shaderProgram);
		this.gl.useProgram(this.shaderProgram);

		//Locate attributes
		this.attributes.vertexPositionAttribute = this.gl.getAttribLocation(
			this.shaderProgram, 
			"aVertexPosition"
		);
		this.gl.enableVertexAttribArray(this.attributes.vertexPositionAttribute);

		this.attributes.vertexColorAttribute = this.gl.getAttribLocation(
			this.shaderProgram, 
			"aVertexColor"
		);
		this.gl.enableVertexAttribArray(this.attributes.vertexColorAttribute);
	}

	render(){

		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		this.perspectiveMatrix = makePerspective(
			45, 
			this.horizAspect, 
			0.1, 
			100.0
		);

		for(var object of this.scene){

			//Translate  model
			this.loadIdentity();
			this.mvTranslate([object.x, object.y, -20.0]);

			//Rotate
			this.mvRotate(object.rotation, [0, 0, 1]);
			this.mvTranslate([-object.x, -object.y, 0]);
			this.mvPushMatrix();

			//Bind vertices
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.vBuffer);

			this.gl.vertexAttribPointer(
				this.attributes.vertexPositionAttribute, 
				3, 
				this.gl.FLOAT, 
				false, 
				0, 
				0
			);

			//Bind colors
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.cBuffer);
			this.gl.vertexAttribPointer(
				this.attributes.vertexColorAttribute, 
				4, 
				this.gl.FLOAT, 
				false, 
				0, 
				0
			);

			//Render buffers
			this.setMatrixUniforms();
			this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

			this.mvPopMatrix();
		}
	}

	mvPushMatrix(m){
		if(m){
			this.mvMatrixStack.push(m.dup());
			this.mvMatrix = m.dup();
		}else{
			this.mvMatrixStack.push(this.mvMatrix.dup());
		}
	}

	mvPopMatrix(){
		if(!this.mvMatrixStack.length){
			throw("Can't pop from an empty matrix stack.");
		}

		this.mvMatrix = this.mvMatrixStack.pop();
		return this.mvMatrix;
	}

	mvRotate(angle, v){
		var inRadians = angle * Math.PI / 180.0;

		var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
		this.multMatrix(m);
	}

	loadIdentity(){
		this.mvMatrix = Matrix.I(4);
	}

	multMatrix(m){
		this.mvMatrix = this.mvMatrix.x(m);
	}

	mvTranslate(v){
		this.multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
	}

	setMatrixUniforms(){
		var pUniform = this.gl.getUniformLocation(this.shaderProgram, "uPMatrix");
		this.gl.uniformMatrix4fv(pUniform, false, new Float32Array(this.perspectiveMatrix.flatten()));

		var mvUniform = this.gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
		this.gl.uniformMatrix4fv(mvUniform, false, new Float32Array(this.mvMatrix.flatten()));
	}
}