
function stopGameplay() {
    engine.stopRenderLoop(); // Stop the rendering loop
    canvas.removeEventListener("pointerdown", onPointerDown); // Disable player input
    canvas.removeEventListener("pointerup", onPointerUp);
    canvas.removeEventListener("pointermove", onPointerMove);
  };

function isCameraPositionEqual(camera, z) {
    var cameraPosition = {}
    // let's copy all user properties into it
for (let key in camera.position) {
    cameraPosition[key] = camera.position[key];
  }
    

     if(cameraPosition._z > z) {
        console.log("camerapositionisequal")
        return true
     };
  }
  // Define a function that checks for the win condition
function hasPlayerWon() {
    // Check if the player has won the game
    if (isCameraPositionEqual(camera, 148)){
       return stopGameplay()    }
    // ...
    // Return true or false depending on whether the win condition is met
  };

 window.addEventListener('DOMContentLoaded', function() {
   
      canvas = document.getElementById('renderCanvas');
      engine = new BABYLON.Engine(canvas, true);
      board = makeMaze(15,15);

      scene = createScene();


      //miniMap = miniMap().board(board);
    
    

// add a click event listener to the canvas
canvas.addEventListener("click", function() {
    // request pointer lock on the canvas element
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
    canvas.requestPointerLock();
});

      engine.runRenderLoop(function() {
        hasPlayerWon()
    
          //miniMap.drawMap();
         scene.render();
      });

      window.addEventListener('resize', function() {
        engine.resize();
      });


      buildWorld(board);


      var cameraJump = function() {
		var cam = scene.cameras[0];

		cam.animations = [];

		var a = new BABYLON.Animation(
		    "a",
		    "position.y", 20,
		    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

		// Animation keys
		var keys = [];
		keys.push({ frame: 0, value: cam.position.y });
		keys.push({ frame: 10, value: cam.position.y + 5 });
		keys.push({ frame: 20, value: cam.position.y });
		a.setKeys(keys);

		var easingFunction = new BABYLON.CircleEase();
		easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
		a.setEasingFunction(easingFunction);

		cam.animations.push(a);



		scene.beginAnimation(cam, 0, 20, false);
	};

    var canJump = true;

      window.onkeypress = function(e){
          var key = e.keyCode ? e.keyCode : e.which;
          console.log(key + " pressed");

          if (canJump && key == 32) {
             cameraJump();
             canJump = false;
             setTimeout(function () {
                 canJump = true;
             }, 1000);
         }else if (key == 96) {
             console.log(Math.round(camera.position.x), Math.round(camera.position.y), Math.round(camera.position.z));
         }
      };
      camera.speed = 1;
      
      // Set the angularSensibility
        camera.angularSensibility = 5000;
// Set the inertia to 0
camera.inertia = 0.7;  
      window.onkeydown = function(e){
          var key = e.keyCode ? e.keyCode : e.which;
          if(key == 16){
              camera.speed = 1.4;
          }
      };
      window.onkeyup = function(e){
          var key = e.keyCode ? e.keyCode : e.which;
          if(key == 16){
              camera.speed = 1;
          }
      };



  });
