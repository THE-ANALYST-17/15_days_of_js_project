//init speech-synth API
const synth=window.speechSynthesis;

//DOM element
const textForm=document.querySelector('form');
const textInput=document.getElementById('text-input')
const voiceSelect=document.getElementById('voice-select')
const rate=document.getElementById('rate')
const rateValue=document.getElementById('rate-value')
const pitch=document.getElementById('pitch')
const pitchValue=document.getElementById('pitch-value')

//init voices array
let voices=[];
const getV=()=>{
    voices=synth.getVoices();
    // console.log(voices);
    voices.forEach(voice=>{
        //create option element
        const option=document.createElement('option')
        //fill option with voice and language
        option.textContent=voice.name +" "+voice.lang;
        //set needed option attribute
        option.setAttribute('data-lang',voice.lang)
        option.setAttribute('data-name',voice.name)
        voiceSelect.appendChild(option)
    })
} 
getV();
if(synth.onvoiceschanged !==undefined){
    synth.onvoiceschanged=getV
}


//speak
const speak=()=>{
    if(synth.speaking){
        console.error('already spaeking')
    }
    if(textInput.value !==""){
        
        //get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //speak error
        speakText.onend=()=>{
        
           console.log('Done Speaking');
        }
        //speak error
        speakText.onerror=()=>{
            console.error('something went wrong');
        }
        //selected voice
        const selectedVoice=voiceSelect.selectedOptions[0].getAttribute('data-name');

        //loop through voices
        voices.map(voice=>{
            if(voice.name===selectedVoice){
                speakText.voice=voice
            }
        })
        speakText.rate=rate.value;
        speakText.pitch=pitch.value;
        synth.speak(speakText)
    }
}
//event listener
//text form submit
textForm.addEventListener('submit',e=>{
    e.preventDefault();
    speak();
    textInput.blur();
})

//rate value change
rate.addEventListener('change',()=>rateValue.textContent=rate.value)
//pitch
pitch.addEventListener('change',()=>pitchValue.textContent=pitch.value)
//voice change
voiceSelect.addEventListener('change',()=>speak())
