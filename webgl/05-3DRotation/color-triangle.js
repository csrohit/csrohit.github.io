
const vsSource = `
attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;

uniform mat4 uMVPMatrix;

varying lowp vec4 vColor;

void main(void) {
  gl_Position = uMVPMatrix * aVertexPosition;
  vColor = aVertexColor;
}
`;

const fsSource = `
varying lowp vec4 vColor;

void main(void) {
  gl_FragColor = vColor;
}
`;

const positions = [
    /* Front */
    0.0,  1.0,  0.0,
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
    /* Right */
     0.0,  1.0,  0.0,
     1.0, -1.0,  1.0,
     1.0, -1.0, -1.0,
    /* Back */
     0.0,  1.0,  0.0,
     1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0,
    /* Left */
     0.0,  1.0,  0.0,
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0
];
const cube_positions = 
[
    /* Front */
    1.0, 1.0, -1.0,
    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,

    /* Top */
    1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,

    /* Bottom */
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,

    /* Back */
    1.0, 1.0, -1.0,
    -1.0, 1.0, -1.0,
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,

    /* Right */
    1.0, 1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, -1.0, -1.0,

    /* Left */
    -1.0, 1.0, 1.0,
    -1.0, 1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,
];

const colors = [
    1.0, 0.0, 0.0, // red
    0.0, 1.0, 0.0, // green
    0.0, 0.0, 1.0,  // blue
    1.0, 0.0, 0.0, // red
    0.0, 0.0, 1.0,  // blue
    0.0, 1.0, 0.0, // green
    1.0, 0.0, 0.0, // red
    0.0, 1.0, 0.0, // green
    0.0, 0.0, 1.0,  // blue
    1.0, 0.0, 0.0, // red
    0.0, 0.0, 1.0,  // blue
    0.0, 1.0, 0.0, // green
    1.0, 0.0, 0.0, // red
    0.0, 0.0, 1.0,  // blue
    0.0, 1.0, 0.0, // green
];
const cube_colors = [
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    1.0, 0.5, 0.0,
    1.0, 0.5, 0.0,
    1.0, 0.5, 0.0,
    1.0, 0.5, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,

    1.0, 1.0, 0.0,
    1.0, 1.0, 0.0,
    1.0, 1.0, 0.0,
    1.0, 1.0, 0.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    1.0, 0.0, 1.0,
    1.0, 0.0, 1.0,
    1.0, 0.0, 1.0,
    1.0, 0.0, 1.0
  ];

let shaderProgram = 0;
let gl = null;
let MVPUniformID = 0;

let squareRotation = 0.5;
let deltaTime = 0;
let pyramid_positionBuffer = 0;
let pyramid_vertexPosition = 0;
let pyramid_colorBuffer = 0;
let pyramid_vertexColor = 0;
let cube_positionBuffer = 0;
let cube_colorBuffer = 0;

main();

function main() {
    const canvas = document.querySelector("#glcanvas");
    gl = canvas.getContext("webgl");
    if (gl === null) {
        alert(
            "Unable to initialize WebGL. Your browser or machine may not support it."
        );
        return;
    }

    shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    MVPUniformID = gl.getUniformLocation(shaderProgram, "uMVPMatrix");

    pyramid_vertexPosition = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(pyramid_vertexPosition);

    pyramid_vertexColor = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(pyramid_vertexColor);
    
    pyramid_positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pyramid_positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


    pyramid_colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pyramid_colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

        
    cube_positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cube_positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube_positions), gl.STATIC_DRAW);


    cube_colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cube_colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube_colors), gl.STATIC_DRAW)


    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    drawScene();
}

let then = 0;

// Draw the scene repeatedly
function render(now) {
  now *= 0.001; // convert to seconds
  deltaTime = now - then;
  then = now;

  drawScene();
  squareRotation += deltaTime;

  requestAnimationFrame(render);
}
requestAnimationFrame(render);

function drawScene() {


    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, (45 * Math.PI) / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 100.0);

    const modelViewMatrix = mat4.create();

    /* Pyramid */
    mat4.translate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to translate
        [-1.5, 0.0, -6.0]
    );
    mat4.rotate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to rotate
        squareRotation, // amount to rotate in radians
        [0, 1, 0],
      ); // axis to rotate around(

    const MVPMAtrix = mat4.create();
    mat4.mul(MVPMAtrix,projectionMatrix,modelViewMatrix );

    gl.useProgram(shaderProgram);
    gl.uniformMatrix4fv(
        MVPUniformID,
        false,
        MVPMAtrix
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, pyramid_positionBuffer);
    gl.vertexAttribPointer(
        pyramid_vertexPosition,
        3,
        gl.FLOAT,
        false,
        0,
        0
    );
    gl.bindBuffer(gl.ARRAY_BUFFER, pyramid_colorBuffer);
    gl.vertexAttribPointer(
        pyramid_vertexColor,
        3,
        gl.FLOAT,
        false,
        0,
        0
    );
    gl.drawArrays(gl.TRIANGLES, 0, 15);

    /* Cube*/
    mat4.identity(MVPMAtrix);
    mat4.identity(modelViewMatrix);
    mat4.translate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to translate
        [1.5, 0.0, -6.0]
    );
    mat4.rotate(modelViewMatrix, modelViewMatrix, squareRotation, [0, 0, 1]); 
    mat4.rotate(modelViewMatrix, modelViewMatrix, squareRotation, [0, 1, 0]); 
    mat4.rotate(modelViewMatrix, modelViewMatrix, squareRotation, [1, 0, 0]); 
    mat4.scale(modelViewMatrix, modelViewMatrix, [.85, .85, .85]);

    mat4.mul(MVPMAtrix, projectionMatrix,modelViewMatrix );

    gl.useProgram(shaderProgram);
    gl.uniformMatrix4fv(
        MVPUniformID,
        false,
        MVPMAtrix
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, cube_positionBuffer);
    gl.vertexAttribPointer(
        pyramid_vertexPosition,
        3,
        gl.FLOAT,
        false,
        0,
        0
    );
    gl.bindBuffer(gl.ARRAY_BUFFER, cube_colorBuffer);
    gl.vertexAttribPointer(
        pyramid_vertexColor,
        3,
        gl.FLOAT,
        false,
        0,
        0
    );
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 4, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 8, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 12, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 16, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 20, 4);
}

function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);


    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert(
            `Unable to initialize the shader program: ${gl.getProgramInfoLog(
                shaderProgram
            )}`
        );
        return null;
    }

    return shaderProgram;
}

function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);

    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(
            `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
        );
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}
