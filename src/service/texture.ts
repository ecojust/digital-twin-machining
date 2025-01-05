class Texture {
  static drawPath(path, lineWidth = 50, width = 800, height = 800) {
    console.log(90909);

    // var c = document.getElementById("myCanvas");

    const c = document.createElement("canvas");
    c.width = width;
    c.height = height;

    c.style.position = "absolute";
    c.style.top = "0px";
    c.style.left = "0px";

    var ctx = c.getContext("2d");

    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillRect(0, 0, 800, 800);

    ctx.strokeStyle = "#000000";

    const start = path[0];
    ctx.moveTo(...start);
    path.forEach((p, i) => {
      if (i !== 0) {
        ctx.lineTo(...p);
      }
    });

    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.stroke();

    console.log("ctx", ctx);

    return {
      url: c.toDataURL(),
      buffer: ctx.getImageData(0, 0, width, height).data,
      bufferWidth: width,
      bufferHeight: height,
    };

    //Create dynamic texture attached to new canvas
  }
}

export default Texture;
