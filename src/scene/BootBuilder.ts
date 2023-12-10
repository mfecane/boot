import { Group } from 'three'
import { scene } from './scene'
import { Mesh, Vector3 } from 'three'
import { modelLoader } from './ModelLoader'
import { MaterialBuilder } from './MaterialBuilder'
import { LazyFactory } from 'src/utils/Lazy'

interface BootModel {}

export class BootBuilder {
	private readonly bootGroup: Group
	private boot: Mesh | undefined

	public constructor() {
		this.bootGroup = new Group()
		scene.add(this.bootGroup)
	}

	public async initialize(): Promise<void> {
		if (this.bootGroup) {
			this.bootGroup.clear()
		}

		this.boot = await modelLoader.load('/assets/boot.glb')
		this.boot.scale.set(6, 6, 6)
		this.boot.position.set(0, 4.3, 0)
		this.boot.rotateOnAxis(new Vector3(0, 1, 0), Math.PI * 1.1)
		this.boot.castShadow = true
		this.boot.receiveShadow = true
		this.bootGroup.add(this.boot)
	}

	public async update(model: BootModel): Promise<void> {
		if (!this.boot) {
			throw 'Fail'
		}

		const material = await new MaterialBuilder(
			'/assets/textures/new/boot_low_blinn_BaseColor.png',
			'/assets/textures/new/boot_low_blinn_Normal.png',
			'/assets/textures/new/boot_low_blinn_Metalness.png',
			'/assets/textures/new/boot_low_blinn_Roughness.png'
		).build()
		this.boot.material = material
	}
}

export const bootBuilder = new LazyFactory<BootBuilder>(BootBuilder)