function init() {
    const audioCtx = new AudioContext();
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
            source.connect(audioCtx.destination);
            audioList.push(audio)
            audio.play();
        })
        sound.name.innerText = sound.label
    });

    stopButton.addEventListener('click', () => {
        audioList.forEach(sound => sound.volume = 0)

    })
}

init()