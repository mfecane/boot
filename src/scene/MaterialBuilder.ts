import { MeshPhysicalMaterial, MeshStandardMaterial, Texture, TextureLoader } from 'three'

export class MaterialBuilder {
	private readonly loader: TextureLoader

	public constructor(private readonly albedoUrl: string, private readonly normalUrl: string, private readonly metalnessUrl: string, private readonly roughnessUrl: string) {
		this.loader = new TextureLoader()
	}

	public async build(): Promise<MeshStandardMaterial> {
		const material = new MeshPhysicalMaterial({
			color: 0xffffff,
		})

		const diffuseTexture = await this.loadTexture(this.albedoUrl)
		material.map = diffuseTexture

		const normalTexture = await this.loadTexture(this.normalUrl)
		material.normalMap = normalTexture

		const metalnessTexture = await this.loadTexture(this.metalnessUrl)
		material.metalnessMap = metalnessTexture

		const roughnessTexture = await this.loadTexture(this.roughnessUrl)
		material.roughnessMap = roughnessTexture

		return material
	}

	private loadTexture(url: string): Promise<Texture> {
		return new Promise<Texture>((resolve) => {
			this.loader.load(url, (texture: Texture) => {
                texture.flipY = false
				resolve(texture),
					() => {
						throw 'Fail to load texture'
					}
			})
		})
	}
}
