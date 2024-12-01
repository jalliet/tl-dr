import logging 
from openai import OpenAI
from datetime import datetime
from fastapi import APIRouter, HTTPException, File, UploadFile
from fastapi.responses import FileResponse
import os 

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

client = OpenAI()
parent_dir = os.path.dirname(os.path.dirname(__file__))

speech_router = r = APIRouter()

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
    speech_file_path = os.path.join(parent_dir, f"speech_output/speech_{timestamp}.mp3")
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

@r.post("/stt")
async def stt_endpoint(audio_file: UploadFile = File(...)):
    """Transcribe an audio file to text"""
    try:
        temp_path = None
        # Create temporary file to store audio
        tmp_path = os.path.join(parent_dir, "speech_input/temp.webm")
        with open(tmp_path, 'wb') as temp_file:
            # Write uploaded file content to temp file
            content = await audio_file.read()
            temp_file.write(content)
            temp_path = temp_file.name
        logger.info(f"Temp file created: {temp_path}")
        
        # Transcribe audio using existing function
        transcription = transcribe_audio(temp_path)

        # Clean up temp file
        os.remove(temp_path)

        return {"transcription": transcription}
    except Exception as e:
        logger.error(f"Error in stt endpoint: {e}")
        # Clean up temp file if exists
        # if temp_path:
        #     os.remove(temp_path)
        raise HTTPException(status_code=500, detail=str(e))

@r.get("/tts/{text}")
async def tts_endpoint(text: str):
    """Test the text-to-speech functionality"""
    try:
        speech_file_path = text_to_speech(text)
        return FileResponse(
            speech_file_path,
            media_type="audio/mpeg",
            filename=os.path.basename(speech_file_path)
        )
    except Exception as e:
        logger.error(f"Error in test_tts endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))
