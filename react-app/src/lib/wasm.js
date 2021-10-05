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

const canvasValue = () => {
    const canvas1 = state.canvasRef.current;
    const ctx = canvas1.getContext("2d");
    
    ctx.drawImage(state.img, 0, 0);
    
    let photon = state.wasm;
    
    let image = photon.open_image(canvas1, ctx);

    
    return {
        'canvas1': canvas1,
        'ctx': ctx,
        'photon': photon,
        'image': image,
    };
}


export const filter = async (filterValue) => {
    const cvs = canvasValue();
    
    cvs.photon.filter(cvs.image, filterValue);
    
    cvs.photon.putImageData(cvs.canvas1, cvs.ctx, cvs.image);
}

export const rgbChannel = async (r, b, g) => {
    
    const cvs = canvasValue();
    
    cvs.photon.alter_channels(cvs.image, r, g, b);
    
    cvs.photon.putImageData(cvs.canvas1, cvs.ctx, cvs.image);
    // console.log(cvs.photon.get_image_data(cvs.canvas1, cvs.ctx));
}

export const base64 = async () => {
    const cvs = canvasValue();

    console.log(cvs.image);
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


