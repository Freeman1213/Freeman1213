// Check if browser supports AudioContext
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
const microphone = navigator.mediaDevices.getUserMedia({ audio: true });

let isBlown = false;

microphone.then((stream) => {
  const source = audioContext.createMediaStreamSource(stream);
  source.connect(analyser);
  
  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function detectBlow() {
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }

    let average = sum / bufferLength;

    // If the average sound level is above a threshold (simulate blowing)
    if (average > 50 && !isBlown) {
      blowOutCandles();
      isBlown = true;
    } else if (average < 50) {
      isBlown = false;
    }

    requestAnimationFrame(detectBlow);
  }

  detectBlow();
});

function blowOutCandles() {
  const candles = document.querySelectorAll('.candle');
  candles.forEach(candle => {
    candle.classList.add('blown');
  });
}
function blowOutCandles() {
    // Get all candles and add 'blown' class
    const candles = document.querySelectorAll('.candle');
    candles.forEach(candle => {
      candle.classList.add('blown');
    });
  
    // Play the birthday song when candles are blown out
    const birthdaySong = document.getElementById('birthdaySong');
    birthdaySong.play();
  }
  