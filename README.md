<!DOCTYPE html>
  <head>
    <link rel="icon" type="image/x-icon" href="file:///C:/Users/R41N13R0/Downloads/html/Archivos/LOGO.ico">
    <style>
      body {
        background-color: lightblue;
      }
      .goofy {
        border-style: solid;
        border-width: 5px;
        border-color: RGB(20, 255, 20);
        border-radius: 20px;
        margin: 10px;
        width: 200px;
        height: 40px;
        background-color: red;
        font-family: 'Bangers', serif7;
        font-size: 15px;
        position: relative; top: 5%; left: 0%; transform: translate(-145.5px, 0px);
      }
      .encabezado {
      background-color: blue;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0px;
      margin-bottom: 30px;
      }
      <title>elrayaneyro</title>
    </style>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet">
  </head>
  <body>
    <audio id="myAudio">
      <source src="https://www.myinstants.com/media/sounds/goofy-ahh-sounds.mp3" type="audio/mpeg" preload:"auto">
    </audio>
    <div class="encabezado">
      <button class="goofy" onclick="document.getElementById('myAudio').play()">Click para obtener recompensa</button>
      <h1 style="margin-top: 10px; margin-bottom: 50px; color: red; font-family: 'Bangers', serif; text-align: center; height: 100px; font-size: 100px;">El rayaneyro</h1>
    </div>
    <div style="position: relative; height: 402px;" onclick="{document.getElementById('myAudio').currentTime = 0; document.getElementById('myAudio').pause();}"
">
      <iframe onmouseover="document.getElementById('myAudio').play()" src="https://scratch.mit.edu/projects/975751909/embed" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 485px; height: 402px;"></iframe>
    </div>
  </body>
</html>
