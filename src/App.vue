<template>
  <div class="index">
    <div id="view"></div>

    <!-- <canvas
      id="myCanvas"
      width="800"
      height="800"
      style="border: 1px solid #d3d3d3"
    /> -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Texture from "./service/texture";
import Animation from "./service/animation";

const addGround = () => {
  var material = visbox.Material.createGridMaterial(
    "groundmaterial",
    1 / 4,
    undefined,
    undefined,
    0.5
  );
  var panel = visbox.Node.createPlane("000", 1000, 1000);
  visbox.Material.fillMaterial(panel, material);
  visbox.Node.setRotation(panel, [Math.PI / 2, 0, 0]);
};

const addBox = () => {
  const box = BABYLON.MeshBuilder.CreateBox("box", {
    sideOrientation: BABYLON.Mesh.FRONTSIDE,
    width: 10,
    height: 0.5,
    depth: 10,
  });

  const c = Texture.drawPath();
  const mat2 = visbox.Material.createCanvasMaterial("idid", c);

  box.material = mat2;
};

const add3 = async () => {
  // var ground = visbox.Node.createPlane("000", 5, 5);

  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    height: 5,
    width: 5,
    subdivisions: 4,
  });

  const mat2 = visbox.Material.createNoBottomMaterial_pbr("idid", {
    cutButtom: -0.01,
  });
  mat2.albedoColor = new BABYLON.Color3.FromInts(169, 169, 169).toLinearSpace();
  mat2.metallic = 0.0;
  mat2.roughness = 0;
  mat2.alphaMode = 2;
  mat2.alpha = 0.9999;
  ground.material = mat2;

  Animation.holeQueue(5, (canvas) => {
    const vertexData = visbox.Util.createVertexDataFromHeightMap(
      canvas.buffer,
      canvas.bufferWidth,
      canvas.bufferHeight,
      -0.01,
      0.1,
      300,
      5,
      5
    );
    vertexData.applyToMesh(ground, true);
  });
};

const addBox2 = () => {
  // float: ["time", "dir", "type"],
  // color: ["color1", "color2", "color3", "color4"],

  // const mat3 = visbox.Material.createColorfulMaterial_pbr("idid", {
  //   dir: 2,
  //   type: 2,
  //   color1: [1, 0, 0],
  //   color2: [0, 1, 0],
  //   color3: [0.0, 0, 1],
  //   color4: [1.0, 0, 1],

  //   // time: 1,
  //   // animate: true,
  // });

  // mat2.metallic = 0.0;
  // mat2.roughness = 0;

  const canvas = Texture.drawPath();

  // document.body.appendChild(canvas);

  const mat2 = visbox.Material.createCuttingMaterial_pbr("idid", {
    base: [0.5, 0.2, 0.1],
    cutColor: [0.0, 0.0, 0.0],
    mapPath: canvas,
    offset: -0.1,
  });

  mat2.metallic = 0.0;
  mat2.roughness = 1;

  const scene = visbox.Service.getScene();
  // scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
  //   "/environment.dds",
  //   scene
  // );

  // const box = BABYLON.MeshBuilder.CreateBox("box", {
  //   sideOrientation: BABYLON.Mesh.FRONTSIDE,
  //   width: 10,
  //   height: 0.5,
  //   depth: 10,
  //   segments: 10,
  // });

  // Our built-in 'sphere' shape.
  // var box = BABYLON.MeshBuilder.CreateSphere(
  //   "sphere",
  //   { diameter: 10, segments: 12 },
  //   scene
  // );

  visbox.Loader.loadGltf("/", "cube2.glb", (root) => {
    const box = visbox.Node.findElementById("Cube.001");
    console.log(root);
    // mat2.wireframe = true;

    box.material = mat2;
  });

  // var box = visbox.Node.createPlane("000", 20, 20);
  // visbox.Node.setRotation(box, [Math.PI / 2, 0, 0]);
  // visbox.Node.setPosition(box, [0, 1, 0]);

  // const mat3 = new BABYLON.PBRCustomMaterial("name");

  // mat3.Fragment_Definitions(`
  //   vec4 originColor = vec4(1.0,1.0,0.0,0.5);
  // `);

  // mat3.FragmentShader = mat3.FragmentShader.replace(
  //   "albedoOpacityBlock(\nvAlbedoColor,",
  //   "albedoOpacityBlock(\noriginColor,"
  // );

  console.log(mat2.VertexShader);
};

onMounted(() => {
  console.log(visbox);
  visbox.Service.init("view");
  visbox.Service.showFPS();
  // visbox.Service.setBackground([0 / 255, 0 / 255, 0 / 255]);
  // visbox.Service.addLight("light2", "hemispheric", {
  //   intensity: 10,
  // });
  // var mode = visbox.Service.setCameraMode("fly");

  // addGround();
  // addBox2();

  add3();
});
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
  background: #fff;
  #view {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  #myCanvas {
    position: absolute;
    top: 0;
  }
  #view:focus,
  canvas:focus {
    outline: none;
  }
}
</style>
