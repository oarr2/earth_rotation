import * as THREE from 'three';
import { OrbitControls } from "https://unpkg.com/three@0.112/examples/jsm/controls/OrbitControls.js";


window.THREE = THREE
const w = window.innerWidth
const h = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000)
camera.position.z = 5
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement)


const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23 * Math.PI / 100
scene.add(earthGroup)

new OrbitControls(camera, renderer.domElement)
//load a texture
const loader = new THREE.TextureLoader();
const detail = 12;
const geometry = new THREE.IcosahedronGeometry(1, detail);
const material = new THREE.MeshStandardMaterial({
    map: loader.load("./earth_images/earthmap1k.jpg"),
    //bumpScale: 0.04,
    //color: 0xffff00,
    //flatShading: true
})
const earthMesh = new THREE.Mesh(geometry, material)
earthGroup.add(earthMesh)

const lightMat = new THREE.MeshToonMaterial({
        //color: 0x00ff00,
    map: loader.load("./earth_images/earthlights1k.jpg"),
    //to show both materials
    blending: THREE.AdditiveBlending
    
});

const lightMesh = new THREE.Mesh(geometry, lightMat);
earthGroup.add(lightMesh)

//starfield
// const starGeometry = new THREE.SphereGeometry(100, 50, 50)
// const starMaterial = new THREE.MeshToonMaterial({
//     map: loader.load("./earth_images/starsky.jpg"),
//     side: THREE.DoubleSide,
//     shininess: 0
    
// })
// const starFieldMesh = new THREE.Mesh(starGeometry, starMaterial)
//earthGroup.add(starFieldMesh)

//light of the earthMesh
// const hemilight = new THREE.HemisphereLight(0xffffff, 0x444444)
// scene.add(hemilight)
const sunLight = new THREE.DirectionalLight(0xffffff)
sunLight.position.set(-2, 0.5, 1.5)
scene.add(sunLight)

function animate() {
    requestAnimationFrame(animate)

    earthMesh.rotation.y +=0.001
    lightMesh.rotation.y +=0.001
    //earthMesh.rotation.x +=0.001
    renderer.render(scene, camera)
}
animate()