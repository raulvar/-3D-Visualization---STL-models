const modelos = [
  { nombre: "Modelo 1", archivo: "models/modelo1.stl" },
  { nombre: "Modelo 2", archivo: "models/modelo2.stl" },
  { nombre: "Modelo 3", archivo: "models/modelo3.stl" },
  { nombre: "Modelo 4", archivo: "models/modelo4.stl" }
];

const catalogo = document.getElementById("catalogo");
const visor = document.getElementById("visor");
const contenedor3d = document.getElementById("contenedor3d");
const cerrar = document.getElementById("cerrar");

let renderer, scene, camera, controls, currentMesh;

modelos.forEach(m => {
  const div = document.createElement("div");
  div.className = "item";
  div.textContent = m.nombre;
  div.onclick = () => mostrarModelo(m.archivo);
  catalogo.appendChild(div);
});

cerrar.onclick = () => {
  visor.style.display = "none";
  if (renderer) {
    renderer.dispose();
    contenedor3d.innerHTML = "";
  }
};

function mostrarModelo(ruta) {
  visor.style.display = "flex";
  contenedor3d.innerHTML = "";

  const width = contenedor3d.clientWidth;
  const height = contenedor3d.clientHeight;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
  camera.position.set(0, 0, 100);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  contenedor3d.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x555555));

  const loader = new THREE.STLLoader();
  loader.load(ruta, (geometry) => {
    const material = new THREE.MeshPhongMaterial({ color: 0x00ffcc });
    currentMesh = new THREE.Mesh(geometry, material);
    geometry.center();
    scene.add(currentMesh);
  });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
}
