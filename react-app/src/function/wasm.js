import img_src from '../img/daisies.jpg';

// State Bohongan
const state = {
    'loadedWasm': false,
    'wasm': null,
    'img': null,
    'canvasRef': null,
}

// Buat menyimpan value saat tab dirubah
export const rgbValue = {
    'red': 0,
    'green': 0,
    'blue': 0,
};

export const filterValue = {
    'index' : 0,
    'filter': 'none'
}

async function drawOriginalImage(canvasRef) {
    const img = new Image();

    img.onload = () => {
        state.img = img;
        const canvas = canvasRef.current;
        canvas.width = state.img.width;
        canvas.height = state.img.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(state.img, 0, 0);
    }

    img.src = img_src;
}

export async function loadWasm(canvasRef) {
    try {
        const photon = await import('@silvia-odwyer/photon');

        state.wasm = photon

        drawOriginalImage(canvasRef);
    } finally {
        console.log("Loaded Wasm Successfully");
        state.loadedWasm = true;
        console.log(`loadedWasm is ${state.loadedWasm}`);
    }
    state.canvasRef = canvasRef;
}

export const alterChannel = async (channel_index) => {
    const canvas1 = state.canvasRef.current;
    const ctx = canvas1.getContext("2d");

    ctx.drawImage(state.img, 0, 0);

    let photon = state.wasm;

    let image = photon.open_image(canvas1, ctx);

    photon.alter_channel(image, channel_index, 255);

    photon.putImageData(canvas1, ctx, image);
}

export const filter = async (filterValue) => {
    const canvas1 = state.canvasRef.current;
    const ctx = canvas1.getContext("2d");

    ctx.drawImage(state.img, 0, 0);

    let photon = state.wasm;

    let image = photon.open_image(canvas1, ctx);

    photon.filter(image, filterValue);

    photon.putImageData(canvas1, ctx, image);
}

export const rgbChannel = async (r, b, g) => {
    const canvas1 = state.canvasRef.current;
    const ctx = canvas1.getContext("2d");

    ctx.drawImage(state.img, 0, 0);

    let photon = state.wasm;

    let image = photon.open_image(canvas1, ctx);

    photon.alter_channels(image, r, g, b);

    photon.putImageData(canvas1, ctx, image);
}

export async function effectPipeline() {
    const canvas1 = state.canvasRef.current;
    const ctx = canvas1.getContext("2d");

    ctx.drawImage(state.img, 0, 0);

    let photon = state.wasm;
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


