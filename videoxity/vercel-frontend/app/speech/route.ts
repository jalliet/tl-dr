export async function playTTS(text: string) {
    try {
      const response = await fetch(`/api/speech/tts/${encodeURIComponent(text)}`);
      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
};

export async function speechToText(audioBlob: Blob, setInput: (value: string) => void) {
    try {
        console.log('Starting speech to text with blob:', audioBlob);
        
        const formData = new FormData();
        formData.append('audio_file', audioBlob, 'recording.webm');
        
        const response = await fetch(`/api/speech/stt`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Response data:', data);
        
        if (!data.transcription) {
            throw new Error('No transcription in response');
        }
        
        setInput(data.transcription);
    } catch (error) {
        console.error('Detailed error in speechToText:', {
            message: error.message,
            stack: error.stack,
            blob: audioBlob?.type,
            blobSize: audioBlob?.size
        });
        setInput('Huh what did you say');
    }
}