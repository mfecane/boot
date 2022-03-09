import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import 'json-circular-stringify'

import texturesConfig from 'js/data/props-textures'
import {
  partsConfig,
  parameterValues,
  textureSets,
  defaultTextues,
} from 'js/data/parameters'

let scene
let mainLight
let secondaryLight
let camera
let dummyCamera
let renderer

const findModelnameById = (id) => {
  const modelName = partsConfig[id]?.modelName
  if (!modelName) {
    throw new Error('Could not find model for part id ' + id)
  }
  return modelName
}

const findMeshByModelName = (scene, modelName) => {
  const model = scene.children.find((el) => el.name === modelName)
  if (!model) {
    throw new Error('Could not find model with id ' + id)
  }
  return model
}

const findMeshByID = (scene, id) => {
  const modelName = findModelnameById(id)
  return findMeshByModelName(scene, modelName)
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
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
      const object = findMeshByModelName(scene, o)
      object.material = material
    })
  })
}

const setUpBootMaterial = (scene) => {
  const diffuseTextureSource = defaultTextues.diffuse
  const normalTextureSource = defaultTextues.normal
  const occlusionRoughnessMetallicSource =
    defaultTextues.occlusionRoughnessMetallic

  const diffuseTexture = new THREE.TextureLoader().load(diffuseTextureSource)

  const normalTexture = new THREE.TextureLoader().load(normalTextureSource)

  const occlusionRoughnessMetallicTexture = new THREE.TextureLoader().load(
    occlusionRoughnessMetallicSource
  )

  Object.keys(partsConfig).forEach((key) => {
    var modelName = partsConfig[key].modelName

    const bootPartMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: diffuseTexture,
      normalMap: normalTexture,
      roughnessMap: occlusionRoughnessMetallicTexture,
      metalnessMap: occlusionRoughnessMetallicTexture,
      metalness: 1,
      aoMap: occlusionRoughnessMetallicTexture,
      aoMapIntensity: 0.5,
    })

    const object = findMeshByModelName(scene, modelName)
    object.material = bootPartMaterial
  })
}

const changeBootMaterial = (scene, part, value) => {
  // const bootTextureSet = bootTextures.find((el) => {
  //   const partVal = el.parts.find((el2) => el2.partName === part)
  //   return partVal.value === value
  // })

  const paramaterValueItem = parameterValues.find((pv) => {
    return pv.parts.some((p) => p === part)
  })

  if (!paramaterValueItem) {
    throw new Error('Could not find parameter value item for part ' + part)
  }

  var parametersValue = paramaterValueItem.values[value]

  if (!paramaterValueItem) {
    throw new Error('Could not find parameter value item for value ' + value)
  }

  var textureSet = textureSets[parametersValue.textureSet]

  if (!textureSet) {
    throw new Error('Could not texture set for value ' + value)
  }

  const object = findMeshByID(scene, part)

  if (textureSet.diffuse) {
    const diffuseTexture = new THREE.TextureLoader().load(textureSet.diffuse)
    object.material.map = diffuseTexture
  }

  if (textureSet.normal) {
    const normalTexture = new THREE.TextureLoader().load(textureSet.normal)
    object.material.normalMap = normalTexture
  }

  if (textureSet.occlusionRoughnessMetallic) {
    const occlusionRoughnessMetallicTexture = new THREE.TextureLoader().load(
      textureSet.occlusionRoughnessMetallic
    )
    object.material.roughnessMap = occlusionRoughnessMetallicTexture
    object.material.metalnessMap = occlusionRoughnessMetallicTexture
    object.material.metalness = 1
    object.material.aoMap = occlusionRoughnessMetallicTexture
    object.material.aoMapIntensity = 0.5
  }
}

export function createScene() {
  scene = new THREE.Scene()
  const objects = []

  camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 2000)

  dummyCamera = new THREE.PerspectiveCamera(
    45,
    innerWidth / innerHeight,
    0.1,
    2000
  )

  renderer = new THREE.WebGLRenderer({ antialias: true })

  renderer.setSize(innerWidth, innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ReinhardToneMapping
  renderer.toneMappingExposure = 3
  renderer.domElement.classList.add('mainCanvas')
  document.body.appendChild(renderer.domElement)

  const loader = new GLTFLoader()

  const draco = new DRACOLoader()
  draco.setDecoderConfig({ type: 'js' })
  draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
  loader.setDRACOLoader(draco)
  var t = 0

  const controls = new OrbitControls(dummyCamera, renderer.domElement)
  controls.minDistance = 9
  controls.maxDistance = 22
  controls.target.set(0, 6, 0)
  controls.enablePan = false
  controls.maxPolarAngle = 0.55 * Math.PI
  controls.minPolarAngle = 0.35 * Math.PI
  controls.enableDamping = true
  controls.zoomSpeed = 0.5

  let glb
  let hdriTexture

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    controls.update()

    const offset = new THREE.Vector3(
      dummyCamera.position.x,
      dummyCamera.position.y,
      dummyCamera.position.z
    )

    // Shift camera off-center
    const delta = -2
    const sqrt = Math.sqrt(offset.x * offset.x + offset.z * offset.z)
    offset.x = offset.x - (delta * offset.z) / sqrt
    offset.z = offset.z + (delta * offset.x) / sqrt

    camera.position.set(offset.x, offset.y, offset.z)

    camera.rotation.set(
      dummyCamera.rotation.x,
      dummyCamera.rotation.y,
      dummyCamera.rotation.z
    )
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
      glb = res
      return new Promise((resolve, reject) => {
        new EXRLoader().load(
          'assets/background.exr',
          (texture, textureData) => {
            resolve(texture)
          }
        )
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
        // var nm = object.material.normalMap
        // console.log(nm)
        // object.material.normalMap.flipY = true
        object.material.color = new THREE.Color(0xffffff)
        scene.add(object)
        objects.push(object)
      }
      const shaftObject = findMeshByID(scene, 'shaft')

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
      setUpTextuesForObjects(scene)

      mainLight = directionalLight
      secondaryLight = directionalLight2

      // mesh.rotation.x = Math.PI / 2
      // mesh.position.y = 0
      controls.update()

      window.addEventListener('resize', onWindowResize)

      animate()
    })
}

export function changeLightCallback(value) {
  if (!mainLight || !secondaryLight) {
    return
  }
  const mainCameraHeight = 10
  const mainCameraRadius = 10

  const secondaryCameraHeight = 8
  const secondaryCameraRadius = 10
  const secondaryCameraOffset = Math.PI * 0.7

  const t = value * 2 * Math.PI + Math.PI / 2

  mainLight.position.x = mainCameraRadius * Math.sin(t)
  mainLight.position.y = mainCameraHeight
  mainLight.position.z = mainCameraRadius * Math.cos(t)

  secondaryLight.position.x =
    secondaryCameraRadius * Math.sin(t + secondaryCameraOffset)
  secondaryLight.position.y = secondaryCameraHeight
  secondaryLight.position.z =
    secondaryCameraRadius * Math.cos(t + secondaryCameraOffset)
}

export const changeBootMaterialCallback = (part, value) => {
  changeBootMaterial(scene, part, value)
}
