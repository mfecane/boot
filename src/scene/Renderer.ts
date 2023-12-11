import * as THREE from 'three'
import {
	Camera,
	Object3D,
	Vector2,
	WebGLRenderTarget,
	WebGLRenderer,
} from 'three'

// TODO make state machine
export class MyRenderer {
	public renderer: WebGLRenderer

	public constructor() {
		this.renderer = new WebGLRenderer({ antialias: true })
		this.renderer.setSize(innerWidth, innerHeight)
		this.renderer.shadowMap.enabled = true
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
		this.renderer.toneMapping = THREE.ReinhardToneMapping
		this.renderer.toneMappingExposure = 3
		this.renderer.domElement.classList.add('mainCanvas')
	}

	public renderScene(object: Object3D, camera: Camera) {
		this.renderer.render(object, camera)
	}

	public renderImage(
		width: number,
		height: number,
		buffer: WebGLRenderTarget,
		object: Object3D,
		camera: Camera
	): void {
		const oldSize = new Vector2()
		this.renderer.getSize(oldSize)
		this.renderer.setRenderTarget(buffer)
		this.renderer.setSize(width, height)
		this.renderer.clear()
		this.renderer.render(object, camera)
		this.renderer.setRenderTarget(null)
		this.renderer.setSize(oldSize.x, oldSize.y)
	}

	public setSize(width: number, height: number) {
		this.renderer.setSize(width, height)
	}
}

export const renderer = new MyRenderer()
