attribute vec2 uv;
attribute vec2 position;

uniform vec2 u_echelle;

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
}
