import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Mic, MicOff, Paperclip, X, FileText } from 'lucide-react';

export const FounderInfo = () => {
  const { user, founderInfo, handleSaveFounderInfo } = useApp();

  const [name, setName] = useState(user?.name || founderInfo?.name || "Alex Vance");
  const [aboutCompany, setAboutCompany] = useState(founderInfo?.aboutCompany || "");
  const [role, setRole] = useState(founderInfo?.role || "Founder & CEO");
  const [experience, setExperience] = useState(founderInfo?.experience || "First-time Founder");

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  // File upload state
  const [attachedFile, setAttachedFile] = useState(null);
  const fileInputRef = useRef(null);

  const displayName = name ? name.split(' ')[0] : "Founder";

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
          setAboutCompany(prev => (prev ? prev + ' ' : '') + currentTranscript);
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

      // Append snippet to textarea
      if (typeof content === 'string') {
        const snippet = content.substring(0, 300);
        setAboutCompany(prev => prev + `\n[Attached File "${file.name}": ${snippet}...]`);
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
      setAboutCompany(prev => prev + `\n[Attached File: ${file.name}]`);
    }
  };

  const removeFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleNext = (e) => {
    e.preventDefault();
    handleSaveFounderInfo({
      name: name || user?.name || "Founder",
      aboutCompany,
      role,
      experience,
      attachedFile
    });
  };

  return (
    <div className="main-canvas animate-fade-in" style={{ justifyContent: 'space-between', paddingBottom: '32px' }}>
      {/* Top Greeting matching Reference Image 2 */}
      <div className="greeting-header">
        Hello <strong>{displayName}</strong>,
      </div>

      {/* Main Content Container matching Reference Image 2 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '720px', margin: '0 auto' }}>
        
        {/* Title & Subtitle matching Reference Image 2 */}
        <h1 className="page-title" style={{ fontSize: '42px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-1px' }}>
          Tell Us About Your Company.
        </h1>

        <div style={{ textAlign: 'center', color: '#444444', fontSize: '15px', lineHeight: '1.5', marginBottom: '28px', maxWidth: '600px' }}>
          <p>Take some time, talk to us about what you own. Not the deep files, but your market, people, business, ...</p>
          <p style={{ marginTop: '6px', fontWeight: '800', color: '#111111' }}>Or</p>
          <p style={{ fontWeight: '800', color: '#111111' }}>Use this prompt and paste the result</p>
        </div>

        <form onSubmit={handleNext} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Your Name Input matching Reference Image 2 */}
          <div style={{ backgroundColor: '#e6e6e6', borderRadius: '18px', padding: '16px 24px' }}>
            <span style={{ fontSize: '13px', color: '#666666', display: 'block', marginBottom: '4px' }}>Your Name</span>
            <input 
              type="text" 
              placeholder="Alex Vance"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '18px', fontWeight: '700', color: '#111111', width: '100%' }}
              required
            />
          </div>

          {/* About Your Company Container with Voice (🎤) & Attachment (📎) Icons matching Reference Image 2 */}
          <div 
            style={{ 
              backgroundColor: '#e6e6e6', 
              borderRadius: '20px', 
              padding: '24px 28px', 
              position: 'relative',
              minHeight: '160px',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <span style={{ fontSize: '15px', color: '#666666', fontWeight: '500' }}>
                About Your Company
              </span>

              {/* Voice to Text Microphone Icon Button (Top Right) */}
              <button
                type="button"
                onClick={toggleVoiceToText}
                title={isRecording ? "Stop voice recording" : "Click to speak (Voice to text)"}
                style={{
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
                  animation: isRecording ? 'pulseGlow 1.5s infinite' : 'none'
                }}
              >
                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
            </div>

            {/* Textarea */}
            <textarea
              placeholder=""
              value={aboutCompany}
              onChange={(e) => setAboutCompany(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '17px',
                color: '#111111',
                fontFamily: 'inherit',
                resize: 'none',
                marginTop: '8px',
                marginBottom: '28px'
              }}
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', position: 'absolute', bottom: '16px', right: '20px' }}>
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
                title="Attach company deck or document"
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

          {/* Role & Stage fields matching Reference Image 2 */}
          <div style={{ display: 'flex', gap: '18px', width: '100%' }}>
            <div style={{ flex: 1, backgroundColor: '#e6e6e6', borderRadius: '18px', padding: '16px 24px' }}>
              <span style={{ fontSize: '13px', color: '#666666', display: 'block', marginBottom: '4px' }}>Your Role</span>
              <input 
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '17px', fontWeight: '700', color: '#111111', width: '100%' }}
              />
            </div>

            <div style={{ flex: 1, backgroundColor: '#e6e6e6', borderRadius: '18px', padding: '16px 24px' }}>
              <span style={{ fontSize: '13px', color: '#666666', display: 'block', marginBottom: '4px' }}>Stage</span>
              <input 
                type="text" 
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '17px', fontWeight: '700', color: '#111111', width: '100%' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
            <button 
              type="submit" 
              className="btn-primary"
              style={{ padding: '16px 44px', fontSize: '17px' }}
            >
              <span>Next</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>

      </div>

      <div style={{ textAlign: 'center', color: '#888888', fontSize: '13px', paddingBottom: '8px' }}>
        Founder Profile
      </div>
    </div>
  );
};

export default FounderInfo;
