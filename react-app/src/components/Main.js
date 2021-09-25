import React, { useState, useEffect, useRef } from 'react';
import img_src from '../img/daisies.jpg';

const Main = () => {
  const [loadedWasm, setLoadedWasm] = useState(false);
  const [wasm, setWasm] = useState(null);
  const [img, setImg] = useState(null);

  const canvasRef = useRef(null);
  useEffect(() => {
    loadWasm();

  },
    // eslint-disable-next-line
    [])

  async function drawOriginalImage() {
    const img = new Image();

    img.onload = () => {
      setImg(img);
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0);
    }

    img.src = img_src;
  }

  async function loadWasm() {
    try {
      const photon = await import('@silvia-odwyer/photon');

      setWasm(photon);

      drawOriginalImage();
    } finally {
      console.log("Loaded Wasm Successfully");
      setLoadedWasm(true);
      console.log(`loadedWasm is ${loadedWasm}`);
    }
  }

  async function alterChannel(channel_index) {
    const canvas1 = canvasRef.current;
    const ctx = canvas1.getContext("2d");

    ctx.drawImage(img, 0, 0);

    let photon = wasm;

    let image = photon.open_image(canvas1, ctx);

    photon.alter_channel(image, channel_index, 255);

    photon.putImageData(canvas1, ctx, image);
  }

  async function effectPipeline() {
    const canvas1 = canvasRef.current;
    const ctx = canvas1.getContext("2d");

    ctx.drawImage(img, 0, 0);

    let photon = wasm;
    let phtimg = photon.open_image(canvas1, ctx);

    console.time("PHOTON_WITH_RAWPIX");
    photon.alter_channel(phtimg, 2, 70);
    photon.grayscale(phtimg);
    console.timeEnd("PHOTON_WITH_RAWPIX");

    photon.putImageData(canvas1, ctx, phtimg);

    console.time("PHOTON_CONSTR");
    // photon.canvas_wasm_only(canvas1, ctx);
    console.timeEnd("PHOTON_CONSTR");
  }


  return (
    <div className="default">
      <SideBar >
        <li id="alter_red" onClick={() => alterChannel(0)}>Increase Red Channel</li>
        <li id="alter_green" onClick={() => alterChannel(1)}>Increase Green Channel</li>
        <li id="alter_blue" onClick={() => alterChannel(2)}>Increase Blue Channel</li>
        <li id="alter_blue" onClick={effectPipeline}>Inc Channel + Threshold</li>
      </SideBar>
      <Canvas>
        <canvas ref={canvasRef} />
      </Canvas>
    </div>
  )
}

const SideBar = (props) => {
  return (
    <div className="sidebar">
      <h3 className="logo">Photon</h3>
      <ul>
        <h4>Channels</h4>
        {props.children}
      </ul>
    </div>
  );
}

const Canvas = (props) => {
  return (
    <div className="main">
      <div className="main_content">
        <section className="content">
          <h2>Image</h2>
          {props.children}
        </section>
      </div>
    </div>
  )
}

export default Main;