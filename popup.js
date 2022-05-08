
function init() {
    const audioCtx = new AudioContext();


    const I = document.getElementById('I');
    const II = document.getElementById('II');
    const III = document.getElementById('III');
    const VI = document.getElementById('VI');
    const stopButton = document.getElementById('stop')

    const soundList = [{
        source: "./sounds/ting.wav",
        name: I
    },
        {name: II, source: "./sounds/cash.wav"},
        {name: III, source: "./sounds/Crowd.wav"},
        {name: VI, source: "./sounds/crowd_Applause.wav"}
    ]
    let audioList = []
//
// I.addEventListener('click',()=>{
//     const audio = new Audio("./sounds/ting.wav");
//     const source = audioCtx.createMediaElementSource(audio);
//     source.connect(audioCtx.destination);
//     audio.play();
//
// })

    soundList.forEach(sound => {
        sound.name.addEventListener('click', () => {
            if (audioCtx.state === 'suspended') audioCtx.resume()
            const audio = new Audio(sound.source);
            const source = audioCtx.createMediaElementSource(audio);
            source.connect(audioCtx.destination);
            audioList.push(audio)
            audio.play();
        })
    });

    stopButton.addEventListener('click',()=>{
        // audioCtx.close()
        //  init()
        // console.log(audioList)
        audioList.forEach(sound=>sound.volume=0)

    })
}

init()