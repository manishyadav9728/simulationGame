let app = new PIXI.Application({
  width: 600,
  height: 600,
  backgroundColor: 0x607e5b,
});
document.body.prepend(app.view);
globalThis.__PIXI_APP__ = app;
let flyDrone = PIXI.Sprite.from("drone.png");
flyDrone.anchor.set(0.5);
let bomb = PIXI.Sprite.from("bomb.png");

let planeContainer = new PIXI.Container();
const stepSize = 50;
const hitLenght = 100;
const direction = ["N", "S", "E", "W"];
const north = 0;
const east = 1.57;
const south = 3.14;
const west = 4.71;
const rotationDegree = 1.57;

app.stage.addChild(planeContainer);

let place = document.getElementsByClassName("place")[0];
let left = document.getElementsByClassName("left")[0];
let right = document.getElementsByClassName("right")[0];
let move = document.getElementsByClassName("move")[0];
let report = document.getElementsByClassName("report")[0];
let attack = document.getElementsByClassName("attack")[0];
let buttonPlace = document.getElementsByClassName("buttonPlace")[0];
let xPos = document.getElementById("X");
let yPos = document.getElementById("Y");
let face = document.getElementById("F");

flyDrone.scale.set(0.5);
flyDrone.position.set(stepSize, stepSize);
planeContainer.fill = "ff8000";
planeContainer.addChild(flyDrone);

const tl = gsap.timeline({ repeat: -1 });
tl.add([
  gsap.to(flyDrone, { x: 550, duration: 5 }),
  gsap.to(flyDrone, { rotation: east }),
]);

tl.add([
  gsap.to(flyDrone, { y: 550, duration: 5 }),
  gsap.to(flyDrone, { rotation: south }),
]);
tl.add([
  gsap.to(flyDrone, { x: stepSize, duration: 5 }),
  gsap.to(flyDrone, { rotation: west }),
]);
tl.add([
  gsap.to(flyDrone, { y: stepSize, duration: 5 }),
  gsap.to(flyDrone, { rotation: north }),
]);

function placeFunction() {
  if (
    xPos.value < 0 ||
    xPos.value > 10 ||
    yPos.value < 0 ||
    yPos.value > 10 ||
    direction.indexOf(face.value) <= -1 ||
    xPos.value == 0 ||
    yPos.value == 0 ||
    face.value == 0
  ) {
    window.alert(
      "please enter  value in format:X and Y's  values in range 0<value<10 and  face in capital letter Ex: S,W,E,N"
    );
  } else {
    xPos.value *= stepSize;
    yPos.value *= stepSize;
    tl.pause();
    if (face.value === "N") {
      flyDrone.rotation = 0;
    } else if (face.value === "S") {
      flyDrone.rotation = 3.14;
    } else if (face.value === "E") {
      flyDrone.rotation = 1.57;
    } else if (face.value === "W") {
      flyDrone.rotation = 4.71;
    }
    flyDrone.position.set(xPos.value, yPos.value);
  }
}

function leftFunction() {
  if (face.value === "N") {
    flyDrone.rotation = flyDrone.rotation - rotationDegree;
    face.value = "W";
  } else if (face.value === "W") {
    flyDrone.rotation = flyDrone.rotation - rotationDegree;
    face.value = "S";
  } else if (face.value === "S") {
    flyDrone.rotation = flyDrone.rotation - rotationDegree;
    face.value = "E";
  } else if (face.value === "E") {
    flyDrone.rotation = flyDrone.rotation - rotationDegree;
    face.value = "N";
  }
}
function rightFunction() {
  if (face.value === "N") {
    flyDrone.rotation = flyDrone.rotation + rotationDegree;
    face.value = "E";
  } else if (face.value === "E") {
    flyDrone.rotation = flyDrone.rotation + rotationDegree;
    face.value = "S";
  } else if (face.value === "S") {
    flyDrone.rotation = flyDrone.rotation + rotationDegree;
    face.value = "W";
  } else if (face.value === "W") {
    flyDrone.rotation = flyDrone.rotation + rotationDegree;
    face.value = "N";
  }
}
function moveFunction() {
  if (face.value === "N") {
    if (flyDrone.y - stepSize >= stepSize) {
      flyDrone.y = flyDrone.y - stepSize;
    }
  }
  if (face.value === "S") {
    if (Number(flyDrone.y) + stepSize <= 550) {
      flyDrone.y = Number(flyDrone.y) + stepSize;
    }
  }
  if (face.value === "E") {
    if (Number(flyDrone.x) + stepSize <= 550) {
      flyDrone.x = Number(flyDrone.x) + stepSize;
    }
  }
  if (face.value === "W") {
    if (flyDrone.x - stepSize >= stepSize) {
      flyDrone.x = flyDrone.x - stepSize;
    }
  }
}
function reportFunction() {
  window.alert(
    `Drone is at position X:${Math.round(flyDrone.x / 50)},Y:${Math.round(
      flyDrone.y / 50
    )} and face:${face.value}`
  );
}
function attackFunction() {
  if (face.value === "N") {
    if (flyDrone.y - hitLenght > 0) {
      const tl = gsap.timeline();
      tl.add(() => {
        bomb.scale.set(0.5);
        bomb.anchor.set(0.5);
        bomb.position.set(flyDrone.x, flyDrone.y);
        planeContainer.addChild(bomb);
        bomb.rotation = north;
      });
      tl.add(gsap.to(bomb, { y: flyDrone.y - hitLenght, duration: 1 }));
      tl.add(() => {
        planeContainer.removeChild(bomb);
      });
    }
  }
  if (face.value === "S") {
    if (Number(flyDrone.y) + hitLenght < 600) {
      const tl = gsap.timeline();
      tl.add(() => {
        bomb.scale.set(0.5);
        bomb.anchor.set(0.5);
        bomb.position.set(flyDrone.x, flyDrone.y);
        planeContainer.addChild(bomb);
        bomb.rotation = south;
      });
      tl.add(gsap.to(bomb, { y: Number(flyDrone.y) + hitLenght, duration: 1 }));
      tl.add(() => {
        planeContainer.removeChild(bomb);
      });
    }
  }
  if (face.value === "E") {
    if (Number(flyDrone.x) + hitLenght < 600) {
      const tl = gsap.timeline();
      tl.add(() => {
        bomb.scale.set(0.5);
        bomb.anchor.set(0.5);
        bomb.position.set(flyDrone.x, flyDrone.y);
        planeContainer.addChild(bomb);
        bomb.rotation = east;
      });
      tl.add(gsap.to(bomb, { x: Number(flyDrone.x) + hitLenght, duration: 1 }));
      tl.add(() => {
        planeContainer.removeChild(bomb);
      });
    }
  }
  if (face.value === "W") {
    if (flyDrone.x - hitLenght > 0) {
      const tl = gsap.timeline();
      tl.add(() => {
        bomb.scale.set(0.5);
        bomb.anchor.set(0.5);
        bomb.position.set(flyDrone.x, flyDrone.y);
        planeContainer.addChild(bomb);
        bomb.rotation = west;
      });
      tl.add(gsap.to(bomb, { x: flyDrone.x - hitLenght, duration: 1 }));
      tl.add(() => {
        planeContainer.removeChild(bomb);
      });
    }
  }
}
attack.addEventListener("click", attackFunction);
report.addEventListener("click", reportFunction);
move.addEventListener("click", moveFunction);
right.addEventListener("click", rightFunction);
left.addEventListener("click", leftFunction);
buttonPlace.addEventListener("click", placeFunction);
