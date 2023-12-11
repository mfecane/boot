enum MColor {
	red,
	blue,
	black,
	green,
	brown,
}

enum Facture {
	nubuck,
	leather,
}

enum BootMeshes {
	heel = 'heel',
	lace_end = 'lace_end',
	laces = 'laces',
	shaft = 'shaft',
	sole = 'sole',
	strap = 'strap',
	toe = 'toe',
	tongue = 'tongue',
}

// masks
enum BootParts {
    heel = 'heel',
	lace_end = 'lace_end',
	laces = 'laces',
	shaft = 'shaft',
	sole = 'sole',
	strap = 'strap',
	toe = 'toe',
	tongue = 'tongue',
    metal = 'metal'
}

// heel shaft tongue 
// model
const mod = {
    [BootParts.heel]: {
        facture: 'nubuck',
        color: 'white',
		affectedMeshes: [BootMeshes.heel]
    },
    [BootParts.tongue]: {
        facture: 'nubuck',
        color: 'white'
    },
    [BootParts.metal]: {
        facture: 'brass',
        color: 'red'
    },
    [BootParts.sole]: {
        facture: 'rubber',
        color: 'black'
    }
}

export type BootMaterialModel = {
	[key in BootMeshes]: {
		color: MColor
		facture: Facture
	}
}

type BaseTexturesType = {
	[key in Facture]: {
		color: string
		normal: string
		metalness: string
		roughness: string
	}
}

const Options :{
    parts: BootParts[],
    factures: Facture[]
}[] = []

const baseTextures: BaseTexturesType = {
	[Facture.nubuck]: {
		color: '',
		normal: '',
		metalness: '',
		roughness: '',
	},
	[Facture.leather]: {
		color: '',
		normal: '',
		metalness: '',
		roughness: '',
	},
}

// cache
export class TexB {
	public constructor(
		private part: BootMeshes,
		private color: MColor,
		private facture: Facture
	) {}

	public create() {
		// getMask
		// getColor
		// getFacture
		// createColorMap with shader -> colormap
		// createFactureMap combining by mask -> normalmap etc
	}

	public createColorMap() {}
}
