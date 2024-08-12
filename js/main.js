const canvas = document.querySelector("canvas");
const conText = canvas.getContext("2d");


const frames = {
    currentIndex: 0,
    maxIndex: 900,
}
let imgLoaded = 0;
const images = [];

function frameLoding() {
    for (i = 1; i <= frames.maxIndex; i++) {
        const imgUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpeg`
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
            imgLoaded++;
            if (imgLoaded === frames.maxIndex) {
                loadImg(frames.currentIndex);
                startAnimation();
            }
        }
        img.onerror = (e) => {
            console.error(`Loading Faild Error Image! ${imgUrl}`, e.error);
        }
        images.push(img);
    }
}
function loadImg(index) {
    if (index >= 0 && index <= frames.maxIndex) {
        const img = images[index];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;
        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;
        conText.clearRect(0, 0, canvas.width, canvas.height);
        conText.imageSmoothingEnabled = true;
        conText.imageSmoothingQuality = "high";
        conText.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        frames.currentIndex = index;
    }
}
function startAnimation() {
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".bottle",
            start: 'top top',
            scrub: 4,
            end: 'bottom bottom',
            markers: false

        }
    })
    tl.to(frames, {
        currentIndex: frames.maxIndex,
        onUpdate: function () {
            loadImg(Math.floor(frames.currentIndex))
        }
    })
}
frameLoding();

