import {
	BufferGeometry,
	Color,
	Float32BufferAttribute,
	Mesh,
	MeshBasicMaterial,
	OrthographicCamera,
	PerspectiveCamera,
	RGBAFormat,
	Scene,
	ShaderMaterial,
	Texture,
	Vector2,
	WebGLRenderTarget,
	WebGLRenderer,
} from 'three'
import { MyRenderer, renderer } from './Renderer'

export enum PartId {
	metals = 'metals',
	shaft = 'shaft',
	tongue = 'tongue',
	toe = 'toe',
	strap = 'strap',
	heel = 'heel',
	sole = 'sole',
	stitches = 'stitches',
	laces = 'laces',
}

const PART_MASK_COLOOR = {
	[PartId.metals]: new Color(0xff0000),
	[PartId.shaft]: new Color(),
	[PartId.tongue]: new Color(),
	[PartId.toe]: new Color(),
	[PartId.strap]: new Color(),
	[PartId.heel]: new Color(),
	[PartId.sole]: new Color(),
	[PartId.stitches]: new Color(),
	[PartId.laces]: new Color(),
}

class FullScreenQuadGeometry extends BufferGeometry {
	constructor() {
		super()
		this.setAttribute(
			'position',
			new Float32BufferAttribute([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)
		)
		this.setAttribute(
			'uv',
			new Float32BufferAttribute([0, 2, 0, 0, 2, 0], 2)
		)
	}
}

const shad = new ShaderMaterial({
	uniforms: {
		depthTexture: { value: null },
		cameraNearFar: { value: new Vector2(0.5, 0.5) },
		textureMatrix: { value: null },
	},

	vertexShader: `#include <morphtarget_pars_vertex>
        #include <skinning_pars_vertex>

        varying vec4 projTexCoord;
        varying vec4 vPosition;
        uniform mat4 textureMatrix;

        void main() {

            #include <skinbase_vertex>
            #include <begin_vertex>
            #include <morphtarget_vertex>
            #include <skinning_vertex>
            #include <project_vertex>

            vPosition = mvPosition;

            vec4 worldPosition = vec4( transformed, 1.0 );

            #ifdef USE_INSTANCING

                worldPosition = instanceMatrix * worldPosition;

            #endif
            
            worldPosition = modelMatrix * worldPosition;

            projTexCoord = textureMatrix * worldPosition;

        }`,

	fragmentShader: `#include <packing>
        varying vec4 vPosition;
        varying vec4 projTexCoord;
        uniform sampler2D depthTexture;
        uniform vec2 cameraNearFar;

        void main() {

            float depth = unpackRGBAToDepth(texture2DProj( depthTexture, projTexCoord ));
            float viewZ = - DEPTH_TO_VIEW_Z( depth, cameraNearFar.x, cameraNearFar.y );
            float depthTest = (-vPosition.z > viewZ) ? 1.0 : 0.0;
            gl_FragColor = vec4(0.0, depthTest, 1.0, 1.0);

        }`,
})

export class TextureBuilder {
	// private idmask: Texture

	private renderer: MyRenderer

	public constructor(private texture: Texture) {
		this.renderer = renderer
	}

	public blendTexture(): Texture {
		// source: Texture, partId: PartId

		const width = this.texture.image.width
		const height = this.texture.image.height
		const buffer = new WebGLRenderTarget(width, height)
		const fsQuad = new Mesh(
			new FullScreenQuadGeometry(),
			new MeshBasicMaterial({ color: 0xff00ff })
		)
		const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
        this.renderer.renderImage(width, height, buffer, fsQuad, camera)

		// need to keep the same context

		// this.testRenderTarget(width, height, this.renderer, buffer)

		// this.texture.copy(buffer.texture)

		// test
		// renderer.setRenderTarget(null)
		// renderer.clear()
		// renderer.render(fsQuad, camera)
		// const image = document.createElement('img')
		// const imageDataURL = renderer.domElement.toDataURL();
		// image.src = imageDataURL;
		// document.body.appendChild(image)

		// allocate RGBA array

		return buffer.texture
	}

	public async adjustColor(color: Color, partId: PartId) {}

	private testRenderTarget(
		width: number,
		height: number,
		renderer: WebGLRenderer,
		buffer: WebGLRenderTarget
	) {
		let pixels = new Uint8Array(width * height * 4)

		let can = document.createElement('canvas'),
			ctx,
			ctxData,
			color

		renderer.readRenderTargetPixels(buffer, 0, 0, width, height, pixels)

		can.width = width
		can.height = height

		ctx = can.getContext('2d')
		if (!ctx) {
			throw 'Broken'
		}
		ctxData = ctx.getImageData(0, 0, can.width, can.height)

		for (var fy = 0; fy < height; fy++) {
			for (var fx = 0; fx < width; fx++) {
				color = [
					pixels[fy * width * 4 + fx * 4 + 0],
					pixels[fy * width * 4 + fx * 4 + 1],
					pixels[fy * width * 4 + fx * 4 + 2],
					pixels[fy * width * 4 + fx * 4 + 3],
				]

				ctxData.data[fy * can.width * 4 + fx * 4 + 0] = color[0]
				ctxData.data[fy * can.width * 4 + fx * 4 + 1] = color[1]
				ctxData.data[fy * can.width * 4 + fx * 4 + 2] = color[2]
				ctxData.data[fy * can.width * 4 + fx * 4 + 3] = color[3]
			}
		}

		ctx.putImageData(ctxData, 0, 0)

		document.body.appendChild(can)
	}
}
