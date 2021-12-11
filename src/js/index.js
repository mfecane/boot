import 'css/null.scss'
import 'css/global.scss'

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import normalTexture from 'assets/boot_low_blinn_Normal.png'
import diffuseTextureSource from 'assets/boot_low_blinn_BaseColor.png'
import roughnessTextureSource from 'assets/boot_low_blinn_Roughness.png'
import metalnessTextureSource from 'assets/boot_low_blinn_Metallic.png'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// const scene = new THREE.Scene();
let scene
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

document.body.appendChild(renderer.domElement)

const loader = new GLTFLoader()

const draco = new DRACOLoader()
draco.setDecoderConfig({ type: 'js' })
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
loader.setDRACOLoader(draco)
var t = 0

const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 15
controls.maxDistance = 20
controls.target.set(0, 6, 0)
controls.enablePan = false
controls.maxPolarAngle = (Math.PI * 1) / 2 - 0.1
controls.minPolarAngle = (Math.PI * 2) / 7

let glb
let hdriTexture

function animate() {
  requestAnimationFrame(animate)
  // renderer.render(scene, camera)
  renderer.render(glb.scene, camera)
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
    glb = res

    return new Promise((resolve, reject) => {
      new EXRLoader().load(
        'assets/carpentry_shop_02_4k.exr',
        (texture, textureData) => {
          resolve(texture)
        }
      )
    })
  })
  .then((res) => {
    scene = glb.scene

    hdriTexture = res

    // TODO use async/await
    hdriTexture.mapping = THREE.EquirectangularReflectionMapping

    scene.background = hdriTexture
    // scene.environment = hdriTexture

    // const texture = new THREE.TextureLoader().load(normalTexture)
    // texture.flipY = false

    // const diffuseTexture = new THREE.TextureLoader().load(diffuseTextureSource)
    // diffuseTexture.flipY = false

    // const roughnessTexture = new THREE.TextureLoader().load(
    //   roughnessTextureSource
    // )
    // roughnessTexture.flipY = false

    // const metalnessTexture = new THREE.TextureLoader().load(
    //   metalnessTextureSource
    // )
    // metalnessTexture.flipY = false

    // const aoTexture = new THREE.TextureLoader().load(aoTextureSource)
    // aoTexture.flipY = false

    // const mat2 = new THREE.MeshStandardMaterial({
    //   color: 0xffffff,
    //   map: diffuseTexture,
    //   normalMap: texture,
    //   roughnessMap: roughnessTexture,
    //   metalnessMap: metalnessTexture,
    // })

    const mesh = glb.scene.children[0]
    // mesh.material = mat2
    // scene.add(mesh)

    const axesHelper = new THREE.AxesHelper(5)
    // scene.add(axesHelper)

    const directionalLight = new THREE.DirectionalLight(0xffffdd, 1)
    directionalLight.position.set(4, 4, 3)
    directionalLight.target = mesh
    directionalLight.castShadow = true
    const directionalLightHelper = new THREE.DirectionalLightHelper(
      directionalLight,
      2
    )
    // scene.add(directionalLightHelper)
    scene.add(directionalLight)

    directionalLight.shadow.mapSize.width = 1024 // default
    directionalLight.shadow.mapSize.height = 1024 // default
    directionalLight.shadow.camera.near = 0.5 // default
    directionalLight.shadow.camera.far = 10 // default
    directionalLight.shadow.camera.top = 3
    directionalLight.shadow.camera.right = 3
    directionalLight.shadow.camera.bottom = -3
    directionalLight.shadow.camera.left = -3

    // mesh.castShadow = true
    // mesh.receiveShadow = true

    const directionalLight2 = new THREE.DirectionalLight(0xccccff, 0.3)
    directionalLight2.position.set(-3, 0, -3)
    directionalLight2.target = mesh
    const directionalLighthelper2 = new THREE.DirectionalLightHelper(
      directionalLight2,
      5
    )
    //scene.add(directionalLighthelper2)
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
    // const directionalLightShadowHelper = new THREE.CameraHelper(
    //   directionalLight.shadow.camera
    // )
    //scene.add(directionalLightShadowHelper)

    // mesh.rotation.x = Math.PI / 2
    // mesh.position.y = 0
    controls.update()

    animate()
  })
