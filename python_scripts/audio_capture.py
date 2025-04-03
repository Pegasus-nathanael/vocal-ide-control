import pyaudio
import sys

def capture_audio():
    CHUNK = 1024
    FORMAT = pyaudio.paInt16
    CHANNELS = 1
    RATE = 16000

    p = pyaudio.PyAudio()
    stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)
    
    print("Enregistrement...", file=sys.stderr)
    data = stream.read(CHUNK * 10)  # Capture 10 chunks (~0.6s)
    print("Terminé.", file=sys.stdout)  # Changement ici : stdout au lieu de stderr
    
    stream.stop_stream()
    stream.close()
    p.terminate()
    return data.hex()

if __name__ == "__main__":
    result = capture_audio()
    print(result)