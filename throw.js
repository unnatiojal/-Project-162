AFRAME.registerComponent("bowling-balls", {
  init: function () {
    this.throwBall();
  },
  throwBall: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var  ball = document.createElement("a-entity");

        ball.setAttribute("gltf-model", "./assets/bowling_ball/scene.gltf");

        ball.setAttribute("scale", { x: 3, y: 3,  z: 3});

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        ball.setAttribute("position", {
          x: pos.x,
          y: pos.y-1.2,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        ball.setAttribute("velocity", direction.multiplyScalar(-10));

        var scene = document.querySelector("#scene");
        ball.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "10",
        });
        ball.addEventListener("collide", this.removeBall);

        scene.appendChild(ball);
      }
    });
  },
  removeBall: function (e) {
    var element = e.detail.target.el;

    var elementHit = e.detail.body.el;

    if (elementHit.id.includes("pin")) {
      
      var impulse = new CANNON.Vec3(0,1,-15);
      var worldPoint = new CANNON.Vec3().copy(
        elementHit.getAttribute("position")
      );

      elementHit.body.applyForce(impulse, worldPoint);
      element.removeEventListener("collide", this.removeBall);
      var scene = document.querySelector("#scene");
      scene.removeChild(element);
    }
  },
});


