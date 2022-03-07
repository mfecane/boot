import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import 'json-circular-stringify'

import texturesConfig from 'js/data/textures'
import bootTextures from 'js/data/boot-textures'

const scene = new THREE.Scene()
const objects = []

var sceneHelpers = {
  findMesh: (scene, id) => {
    return scene.children.find((el) => el.name === id)
  },
}

const setUpTextuesForObjects = (scene) => {
  texturesConfig.forEach((t) => {
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
    })

    if (t.textures.diffuse) {
      const diffuseTexture = new THREE.TextureLoader().load(t.textures.diffuse)
      const diffuseMap = diffuseTexture
      material.map = diffuseMap
    }

    if (t.textures.normal) {
      const normalTexture = new THREE.TextureLoader().load(t.textures.normal)
      const normalMap = normalTexture
      material.normalMap = normalMap
    }

    if (t.textures.roughness) {
      const roughnessTexture = new THREE.TextureLoader().load(
        t.textures.roughness
      )
      const roughnessMap = roughnessTexture
      material.roughnessMap = roughnessMap
    }

    if (t.textures.metalness) {
      const metalnessTexture = new THREE.TextureLoader().load(
        t.textures.metalness
      )
      const metalnessMap = metalnessTexture
      material.metalness = 1
      material.metalnessMap = metalnessMap
    }

    if (t.textures.ao) {
      const aoTexture = new THREE.TextureLoader().load(t.textures.ao)
      const aoMap = aoTexture
      material.aoMapIntensity = 0.5
      material.aoMap = aoMap
    }

    t.objects.forEach((o) => {
      const object = sceneHelpers.findMesh(scene, o)
      object.material = material
    })
  })
}

const setUpBootMaterial = (scene) => {
  const diffuseTextureSource = bootTextures[0].sources.diffuse
  const normalTextureSource = bootTextures[0].sources.normal
  const roughnessTextureSource = bootTextures[0].sources.roughness
  const metalnessTextureSource = bootTextures[0].sources.metalness
  const aoTextureSource = bootTextures[0].sources.ao

  const diffuseTexture = new THREE.TextureLoader().load(diffuseTextureSource)

  const normalTexture = new THREE.TextureLoader().load(normalTextureSource)

  const roughnessTexture = new THREE.TextureLoader().load(
    roughnessTextureSource
  )

  const metalnessTexture = new THREE.TextureLoader().load(
    metalnessTextureSource
  )

  const aoTexture = new THREE.TextureLoader().load(aoTextureSource)

  bootTextures[0].parts.forEach((el) => {
    const bootPartMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: diffuseTexture,
      normalMap: normalTexture,
      roughnessMap: roughnessTexture,
      metalnessMap: metalnessTexture,
      metalness: 1,
      aoMap: aoTexture,
      aoMapIntensity: 0.5,
    })

    const object = sceneHelpers.findMesh(scene, el.partName)
    object.material = bootPartMaterial
  })
}

const changeBootMaterial = (scene, part, value) => {
  // TODO ::: implement
  // settings.
  const bootTextureSet = bootTextures.find((el) => {
    const partVal = el.parts.find((el2) => el2.partName === part)
    return partVal.value === value
  })

  if (!bootTextureSet) {
    return
  }

  const object = sceneHelpers.findMesh(scene, part)

  if (bootTextureSet.sources.diffuse) {
    const diffuseTexture = new THREE.TextureLoader().load(
      bootTextureSet.sources.diffuse
    )
    object.material.map = diffuseTexture
  }

  if (bootTextureSet.sources.normal) {
    const normalTexture = new THREE.TextureLoader().load(
      bootTextureSet.sources.normal
    )
    object.material.normalMap = normalTexture
  }

  if (bootTextureSet.sources.roughness) {
    const roughnessTexture = new THREE.TextureLoader().load(
      bootTextureSet.sources.roughness
    )
    object.material.roughnessMap = roughnessTexture
  }

  if (bootTextureSet.sources.metalness) {
    const metalnessTexture = new THREE.TextureLoader().load(
      bootTextureSet.sources.metalness
    )
    object.material.metalnessMap = metalnessTexture
  }
}

// let scene
const camera = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  0.1,
  2000
)
const renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.setSize(innerWidth, innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 2
renderer.domElement.classList.add('mainCanvas')
document.body.appendChild(renderer.domElement)

const loader = new GLTFLoader()

const draco = new DRACOLoader()
draco.setDecoderConfig({ type: 'js' })
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
loader.setDRACOLoader(draco)
var t = 0

const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 12
controls.maxDistance = 18
controls.target.set(0, 6, 0)
controls.enablePan = false
controls.maxPolarAngle = 0.55 * Math.PI
controls.minPolarAngle = 0.35 * Math.PI

let glb
let hdriTexture

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  controls.update()

  t += 0.01
}

new Promise((resolve, reject) => {
  loader.load(
    // resource URL
    'assets/scene.glb',
    // called when the resource is loaded
    (glb) => {
      resolve(glb)
    },
    // called while loading is progressing
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    // called when loading has errors
    function (error) {
      console.log('An error happened')
    }
  )
})
  .then((res) => {
    console.log(`loaded scene with ${res.scene.children.length} objects`)
    glb = res
    console.log(`loaded scene with ${glb.scene.children.length} objects`)

    return new Promise((resolve, reject) => {
      new EXRLoader().load('assets/background.exr', (texture, textureData) => {
        resolve(texture)
      })
    })
  })
  .then((res) => {
    // scene = glb.scene

    hdriTexture = res

    // TODO use async/await
    hdriTexture.mapping = THREE.EquirectangularReflectionMapping

    scene.background = hdriTexture
    // scene.environment = hdriTexture

    console.log(`Scene loaded`)
    while (glb.scene.children.length) {
      var object = glb.scene.children[0]
      console.log(`Loaded object name: ${object.name}`)
      // var nm = object.material.normalMap
      // console.log(nm)
      // object.material.normalMap.flipY = true
      object.material.color = new THREE.Color(0xffffff)
      scene.add(object)
      objects.push(object)
    }
    const shaftObject = sceneHelpers.findMesh(scene, 'shaft_low')

    const mesh = scene.children[0]

    // mesh.material = mat2
    // scene.add(mesh)

    const axesHelper = new THREE.AxesHelper(5)
    // scene.add(axesHelper)

    const directionalLightTarget = new THREE.Object3D()
    //scene.add(directionalLightTarget)

    const directionalLight = new THREE.DirectionalLight(0xffffdd, 1)
    directionalLight.position.set(-8, 12, 8)
    // directionalLight.target = mesh
    directionalLight.target = shaftObject
    directionalLight.castShadow = true
    const directionalLightHelper = new THREE.DirectionalLightHelper(
      directionalLight,
      2
    )
    // scene.add(directionalLightHelper)
    scene.add(directionalLight)

    directionalLight.shadow.radius = 4
    directionalLight.shadow.mapSize.width = 1024 // default
    directionalLight.shadow.mapSize.height = 1024 // default
    directionalLight.shadow.camera.near = 2 // default
    directionalLight.shadow.camera.far = 25 // default
    const shadowSize = 8
    directionalLight.shadow.camera.top = shadowSize
    directionalLight.shadow.camera.right = shadowSize
    directionalLight.shadow.camera.bottom = -shadowSize
    directionalLight.shadow.camera.left = -shadowSize

    // mesh.castShadow = true
    // mesh.receiveShadow = true

    objects.forEach((object) => {
      object.castShadow = true
      object.receiveShadow = true
    })

    const directionalLight2Target = new THREE.Object3D()
    scene.add(directionalLight2Target)

    const directionalLight2 = new THREE.DirectionalLight(0xccccff, 0.3)
    directionalLight2.position.set(8, 8, -8)
    directionalLight2.target = directionalLight2Target
    scene.add(directionalLight2.target)
    const directionalLighthelper2 = new THREE.DirectionalLightHelper(
      directionalLight2,
      5
    )
    // scene.add(directionalLighthelper2)
    scene.add(directionalLight2)

    // const planeGeometry = new THREE.PlaneGeometry(5, 5, 64, 64)
    // const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xebeef1 })
    // const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    // plane.rotation.x = -Math.PI / 2

    // plane.receiveShadow = true
    // scene.add(plane)

    // camera.position.x = 3 * Math.sin(t)
    // camera.position.y = 2
    // camera.position.z = 3 * Math.cos(t)

    // camera.lookAt(0.0, 0.0, 0.0)
    const directionalLightShadowHelper = new THREE.CameraHelper(
      directionalLight.shadow.camera
    )
    // scene.add(directionalLightShadowHelper)
    setUpBootMaterial(scene)
    changeBootMaterial(scene, 'shaft_low', '2')
    changeBootMaterial(scene, 'tip_low', '2')
    changeBootMaterial(scene, 'laces_low', '2')
    setUpTextuesForObjects(scene)

    // mesh.rotation.x = Math.PI / 2
    // mesh.position.y = 0
    controls.update()

    animate()
  })
