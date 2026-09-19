import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Mic, MicOff, Paperclip, X, FileText } from 'lucide-react';

export const NewIdea = () => {
  const { 
    user, 
    founderInfo,
    ideaInput, 
    setIdeaInput, 
    location, 
    setLocation, 
    budget, 
    setBudget, 
    additionalInfo, 
    setAdditionalInfo,
    handleForgeSubmit 
  } = useApp();

  // Show registered founder's name
  const registeredName = user?.name || founderInfo?.name || "Founder";
  const userName = registeredName.split(' ')[0];

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  // File upload state
  const [attachedFile, setAttachedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Voice to Text handler
  const toggleVoiceToText = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. You can type or attach a document!");
      return;
    }

    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsRecording(true);

        recognition.onresult = (event) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setIdeaInput(prev => (prev ? prev + ' ' : '') + currentTranscript);
        };

        recognition.onerror = (err) => {
          console.error("Speech recognition error:", err);
          setIsRecording(false);
        };

        recognition.onend = () => setIsRecording(false);

        recognition.start();
        recognitionRef.current = recognition;
      } catch (err) {
        console.error("Could not start speech recognition:", err);
        setIsRecording(false);
      }
    }
  };

  // File upload handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target.result;
      setAttachedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        content: content
      });

      if (typeof content === 'string') {
        const snippet = content.substring(0, 300);
        setIdeaInput(prev => prev + `\n[Attached File "${file.name}": ${snippet}...]`);
      }
    };

    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md') || file.name.endsWith('.json') || file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      setAttachedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        content: `[Attached Document: ${file.name}]`
      });
      setIdeaInput(prev => prev + `\n[Attached File: ${file.name}]`);
    }
  };

  const removeFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleForgeSubmit();
  };

  return (
    <div className="main-canvas animate-fade-in" style={{ justifyContent: 'space-between', paddingBottom: '32px' }}>
      {/* Top Greeting showing registered founder's name matching Reference Image 1 */}
      <div className="greeting-header">
        Hello <strong>{userName}</strong>,
      </div>

      {/* Main Idea Form matching Reference Image 1 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '720px', margin: '0 auto' }}>
        
        <h1 className="page-title" style={{ fontSize: '38px', fontWeight: '800', marginBottom: '28px', letterSpacing: '-1px' }}>
          Let’s Forge Your Idea.
        </h1>

        <form onSubmit={onSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Large Main Box: "Describe your idea." with 🎤 top-right & 📎 bottom-right matching Reference Image 1 */}
          <div 
            style={{ 
              backgroundColor: '#e6e6e6', 
              borderRadius: '20px', 
              padding: '24px 28px', 
              minHeight: '160px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between'
            }}
          >
            {/* Top Row: Placeholder & Voice Mic Icon (Top Right) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <span style={{ fontSize: '18px', color: ideaInput ? 'transparent' : '#333333', pointerEvents: 'none', position: 'absolute' }}>
                Describe your idea.
              </span>

              {/* Voice to Text Microphone Icon Button (Top Right) */}
              <button
                type="button"
                onClick={toggleVoiceToText}
                title={isRecording ? "Stop voice recording" : "Click to speak (Voice to text)"}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '18px',
                  background: isRecording ? '#ef4444' : 'transparent',
                  color: isRecording ? '#ffffff' : '#333333',
                  border: 'none',
                  borderRadius: '50%',
                  padding: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  transition: 'all 0.2s ease',
                  animation: isRecording ? 'pulseGlow 1.5s infinite' : 'none',
                  zIndex: 2
                }}
              >
                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
            </div>

            {/* Textarea */}
            <textarea
              placeholder="Describe your idea."
              value={ideaInput}
              onChange={(e) => setIdeaInput(e.target.value)}
              rows={4}
              required
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '18px',
                color: '#111111',
                fontFamily: 'inherit',
                resize: 'none',
                lineHeight: '1.5',
                marginTop: '4px',
                marginBottom: '28px'
              }}
              autoFocus
            />

            {/* Attached File Badge preview if present */}
            {attachedFile && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff', padding: '6px 12px', borderRadius: '100px', fontSize: '13px', width: 'fit-content', marginBottom: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <FileText size={14} style={{ color: '#111111' }} />
                <span style={{ fontWeight: '600', color: '#111111' }}>{attachedFile.name}</span>
                <span style={{ color: '#888888', fontSize: '11px' }}>({attachedFile.size})</span>
                <button type="button" onClick={removeFile} style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Bottom Row: File Upload Attachment Paperclip Icon (Bottom Right) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', position: 'absolute', bottom: '16px', right: '18px' }}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".txt,.pdf,.doc,.docx,.json,.csv,image/*"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Attach document or deck"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#333333',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  borderRadius: '50%',
                  transition: 'transform 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Paperclip size={20} />
              </button>
            </div>

          </div>

          {/* Two Side-by-Side Boxes: "Location" & "Budget(If Needed)" matching Reference Image 1 */}
          <div style={{ display: 'flex', gap: '18px' }}>
            <div style={{ flex: 1, backgroundColor: '#e6e6e6', borderRadius: '18px', padding: '18px 24px' }}>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  color: '#111111',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ flex: 1, backgroundColor: '#e6e6e6', borderRadius: '18px', padding: '18px 24px' }}>
              <input
                type="text"
                placeholder="Budget(If Needed)"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  color: '#111111',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          {/* Bottom Box: "Anything else to know about" matching Reference Image 1 */}
          <div style={{ backgroundColor: '#e6e6e6', borderRadius: '18px', padding: '18px 24px' }}>
            <input
              type="text"
              placeholder="Anything else to know about"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                color: '#111111',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Primary CTA: "Forge" */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button 
              type="submit" 
              className="btn-primary"
              style={{ padding: '18px 56px', fontSize: '18px', borderRadius: '16px' }}
            >
              <Sparkles size={20} />
              <span>Forge</span>
            </button>
          </div>

        </form>

      </div>

      <div style={{ textAlign: 'center', color: '#888888', fontSize: '13px', paddingTop: '16px' }}>
        Foundry Multi-Agent Engine • Ready to analyze
      </div>
    </div>
  );
};

export default NewIdea;
