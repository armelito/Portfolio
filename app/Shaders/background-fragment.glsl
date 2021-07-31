precision highp float;

uniform sampler2D tWater;
uniform sampler2D tFlow;
uniform float uTime;
uniform vec2 u_resolution;

varying vec2 vUv;

void main() {
    // R and G values are velocity in the x and y direction
    // B value is the velocity length
    vec3 flow = texture2D(tFlow, vUv).rgb;
    // Use flow to adjust the uv lookup of a texture
    vec2 uv = gl_FragCoord.xy / u_resolution;;
    uv += flow.xy * 0.05;
    vec3 tex = texture2D(tWater, uv).rgb;
    // Oscillate between raw values and the affected texture above
    tex = mix(tex, flow * 0.5 + 0.5, smoothstep( -0.3, 0.7, sin(uTime)));

    gl_FragColor.rgb = tex;
    gl_FragColor.a = 1.0;
}
