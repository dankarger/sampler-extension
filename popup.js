/*global chrome*/


const visualizer = document.getElementById('visualizer')

const mainDiv = document.getElementById('main')
function init() {
    const audioCtx = new AudioContext();
    const analyzerNode = new AnalyserNode(audioCtx, {fftSize: 256})
    // const gainNode = new GainNode(audioCtx, {gain: 1})
    // gainNode.connect(audioCtx.destination);
    // analyzerNode.connect(gainNode)
    const I = document.getElementById('I');
    const II = document.getElementById('II');
    const III = document.getElementById('III');
    const VI = document.getElementById('VI');
    const stopButton = document.getElementById('stop')

    const soundList = [{
        source: "./sounds/ting.wav",
        name: I,
        label: "Ting"
    },

        {name: II, source: "./sounds/cash.wav", label: "Cash"},
        {name: III, source: "./sounds/Crowd.wav", label: "Crowd"},
        {name: VI, source: "./sounds/crowd_Applause.wav", label: "Applause"}
    ]
    let audioList = []

    soundList.forEach(sound => {
        sound.name.addEventListener('click', () => {
            if (audioCtx.state === 'suspended') audioCtx.resume()
            const audio = new Audio(sound.source);
            const source = audioCtx.createMediaElementSource(audio);
            source.connect(analyzerNode)
            source.connect(audioCtx.destination);
            audioList.push(source)
            // console.log(audio.duration)
            let sampleDuration
            audio.addEventListener('loadedmetadata', function(){
                // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
                let duration = audio.duration;

                // example 12.3234 seconds
                console.log("The duration of the song is of: " + duration + " seconds");
                sampleDuration=duration
                animateBackground(Math.floor(sampleDuration)*1000)
                // Alternatively, just display the integer value with
                // parseInt(duration)
                // 12 seconds
            },false);


            audio.play();


        })
        sound.name.innerText = sound.label

    });

    stopButton.addEventListener('click', () => {
        audioList.forEach(sound => sound.volume = 0);
        audioCtx.suspend()
        stopAnimate()

    })

    function drawVisualizer () {
        requestAnimationFrame(drawVisualizer)

        const bufferLength = analyzerNode.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyzerNode.getByteFrequencyData(dataArray);
        const width = visualizer.width;
        const height = visualizer.height;
        const barWidth = width / bufferLength;

        const canvasContext = visualizer.getContext('2d')
        canvasContext.clearRect(0, 0, width, height);

        dataArray.forEach((item, index) => {
            const y = item / 255 * height / 2
            const x = barWidth * index;

            canvasContext.fillStyle = `hsl(${y / height * 400}, 100%, 50%)`
            canvasContext.fillRect(x, height - y, barWidth, y)
        })
    }
    drawVisualizer()
}

init();

function animateBackground(timeout) {
    console.log('g',timeout)
   mainDiv.classList.toggle('animate');
   setTimeout(()=>{
       mainDiv.classList.toggle('animate');
   },timeout)
}
function stopAnimate() {
    mainDiv.classList.remove('animate');

}
