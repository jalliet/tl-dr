import API_URL from '../config'

export async function playTTS(text: string) {
    try {
      const response = await fetch(`${API_URL}/tts/${encodeURIComponent(text)}`);
      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
};

export async function speechToText(audioBlob: Blob, setQuery: (value: string) => void) {
    try {
        const formData = new FormData();
        formData.append('audio_file', audioBlob, 'recording.webm');
        const response = await fetch(`${API_URL}/stt`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        setQuery(data.transcription);
    } catch (error) {
        console.error('Error sending audio:', error);
        setQuery('Huh what did you say');
    }
}