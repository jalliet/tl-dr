from openai import OpenAI
from datetime import datetime
import os 

client = OpenAI()

def transcribe_audio(file_path: str) -> str:
    with open(file_path, "rb") as audio_file:
        transcription = client.audio.transcriptions.create(
            model="whisper-1", 
            file=audio_file,
            response_format="text"
        )
    return transcription

def text_to_speech(text: str) -> str:
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    speech_file_path = os.path.join(os.path.dirname(__file__), f"speech_output/speech_{timestamp}.mp3")
    with client.audio.speech.with_streaming_response.create(
        model="tts-1",
        voice="nova",
        input=text,
    ) as response:
        response.stream_to_file(speech_file_path)
    return speech_file_path

def test_transcribe_audio():
    test_audio_path = os.path.join(os.path.dirname(__file__), "test_files/podcast1.mp3")
    res = transcribe_audio(test_audio_path)
    print(res)

def test_tts():
    test_text_path = os.path.join(os.path.dirname(__file__), "test_files/paragraph.txt")
    with open(test_text_path, "r") as f:
        text = f.read()
        res = text_to_speech(text)
    print(res)

# test_tts()
