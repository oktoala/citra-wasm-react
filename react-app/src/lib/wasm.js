
// State Bohongan
const state = {
    'loadedWasm': false,
    'wasm': null,
    'proc': null,
    'img': null,
    'canvasRef': null,
}

export function getRequire() {
    return new Promise(resolve =>  {
        setTimeout(() => {
            resolve('lib/opencv.js');
        });
    });
}

export const isExpanded = {
    'value': false,
}

// Buat menyimpan value saat tab dirubah
export const rgbValue = {
    'red': 0,
    'green': 0,
    'blue': 0,
};

export const hslValue = {
    'hue': 0,
    'saturate': 0,
    'lightness': 0
}

// Buat filter
export const filterValue = {
    'index': 0,
    'filter': 'none'
}

// Buat histogram
export const pixel = {
    'red': {
        frequency: [],
    },
    'green': {
        frequency: [],
    },
    'blue': {
        frequency: [],
    },
}

export const svgValue =
    { svg: null, x: null, y: null, yAxis: null };


export const bins = {
    bin: 8,
    current: 'red',
}

export const appBarWidth = 490;

export let cv2;

export function getCV2(CV2) {
    cv2 = CV2;
}

async function getPixels(canvas, ctx) {
    const photon = state.wasm;

    const image = photon.get_image_data(canvas, ctx);

    const data = image.data;

    Object.keys(pixel).map((value, index) => {
        let maxFrequency = 0;
        const colourFrequencies = Array([]).fill(0);

        for (let i = index, len = data.length; i < len; i += 4) {
            colourFrequencies[maxFrequency] = data[i];
            maxFrequency++;
        }
        pixel[value].frequency = colourFrequencies;
        return null;

    });

    return pixel;
}

export async function drawOriginalImage(canvasRef, img_src) {
    const img = new Image();

    img.onload = async () => {
        state.img = img;
        const canvas = canvasRef.current;
        canvas.width = state.img.width;
        canvas.height = state.img.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(state.img, 0, 0);
        getPixels(canvas, ctx);
    }

    img.src = img_src;
    state.canvasRef = canvasRef;
}

export async function loadWasm(canvasRef, fileImg) {
    try {
        const photon = await import('@silvia-odwyer/photon');

        state.wasm = photon;

        drawOriginalImage(canvasRef, fileImg);

    } finally {
        state.loadedWasm = true;
    }
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

// ! Custom Function
export const filter = async (filterValue) => {
    const cvs = canvasValue();

    if (filterValue === "none") {
        cvs.photon.alter_channels(cvs.image, rgbValue.red, rgbValue.green, rgbValue.blue);
        bins.current = 'red';
    } else if (filterValue === "grayscale") {
        // cvs.photon.grayscale_human_corrected(cvs.image);
        console.log(cvs);
        const src = cv2.imread(cvs.canvas1);
        cv2.cvtColor(src, src, cv2.COLOR_RGB2GRAY, 0);
        cv2.Canny(src, src, 50, 100, 3, false);
        cv2.imshow(cvs.canvas1, src);
        src.delete();
        bins.current = 'grey';
        console.log(cv2);
    } else if (filterValue === "gaussian") {
        cvs.photon.gaussian_blur(cvs.image, 3);
    } else if (filterValue === "sharpen") {
        cvs.photon.sharpen(cvs.image);
    } else {
        cvs.photon.filter(cvs.image, filterValue);
        bins.current = 'red';
    }

    // cvs.photon.putImageData(cvs.canvas1, cvs.ctx, cvs.image);
    getPixels(cvs.canvas1, cvs.ctx);
}

export const rgbChannel = async (r, g, b) => {

    const cvs = canvasValue();

    cvs.photon.alter_channels(cvs.image, r, g, b);

    cvs.photon.putImageData(cvs.canvas1, cvs.ctx, cvs.image);

    getPixels(cvs.canvas1, cvs.ctx);
    bins.current = 'red'
    filterValue.index = 0;
}

export const hslChannel = async (h, s, l) => {
    const cvs = canvasValue();

    cvs.photon.hue_rotate_hsl(cvs.image, 120.0);
    cvs.photon.saturate_hsl(cvs.image, s / 100);
    cvs.photon.lighten_hsl(cvs.image, l / 100);
    cvs.photon.putImageData(cvs.canvas1, cvs.ctx, cvs.image);

}






