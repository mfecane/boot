import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { Group } from 'three'

export class ModelLoader {
	private readonly loader: GLTFLoader

	public constructor() {
		this.loader = new GLTFLoader()
		const draco = new DRACOLoader()
		draco.setDecoderConfig({ type: 'js' })
		draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
		this.loader.setDRACOLoader(draco)
	}

	public async load(url: string): Promise<Group> {
		const gltf = await this.loadGLTF(url)
		if (!gltf.scene) {
			throw 'No data'
		}
		return gltf.scene as unknown as Group
	}

	private loadGLTF(url: string): Promise<GLTF> {
		return new Promise<GLTF>((resolve) => {
			this.loader.load(
				url,
				(glb: GLTF) => {
					resolve(glb)
				},
				function (xhr) {
					console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
				},
				function (error) {
					console.log('An error happened', error.toString())
				}
			)
		})
	}
}

export const modelLoader = new ModelLoader()
