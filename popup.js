/*global chrome*/
// chrome.downloads.download({url: "https://pixijs.download/release/pixi.js"},
//    );
// import * as PIXI from 'pixi.js'
// const PIXI = require('pixi.js')
// import { ShaderSystem, Renderer } from '@pixi/core';
//
// import { install } from '@pixi/unsafe-eval';

// Apply the patch to PIXI
// install({ ShaderSystem });

// const Application = PIXI.Application
//
// const app = new Application({
//     width:600,
//     height:300,
//     transparent: false,
//     antialias: true
// });
// //
// app.renderer.backgroundColor = 'red';
// app.renderer.resize(window.innerWidth,window.innerHeight)
// app.renderer.view.style.position = 'absolute';
// document.body.appendChild(app.view)

const mainDiv = document.getElementById('main')
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
            animateBackground()
            audio.play();
        })
        sound.name.innerText = sound.label
    });

    stopButton.addEventListener('click', () => {
        audioList.forEach(sound => sound.volume = 0)

    })
}

init();

function animateBackground() {
   mainDiv.classList.toggle('animate');
   setTimeout(()=>{
       mainDiv.classList.toggle('animate');
   },700)
}