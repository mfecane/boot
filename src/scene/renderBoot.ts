import { Mesh } from 'three'
import { requireMesh } from './scene'
import { bootBuilder } from './BootBuilder'

function tmpHideMesh(name: string) {
	const mesh: Mesh | undefined = requireMesh(name)
	if (mesh) {
		mesh.visible = false
	}
}

export async function renderBoot() {
	tmpHideMesh('heel_low')
	tmpHideMesh('shaft_low')
	tmpHideMesh('sole_low')
	tmpHideMesh('tongue_low')
	tmpHideMesh('tip_low')
	tmpHideMesh('laces_low')
	tmpHideMesh('strap_low')

	await bootBuilder.get().initialize()
	await bootBuilder.get().update({})
}
