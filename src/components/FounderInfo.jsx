import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Mic, MicOff, Paperclip, X, FileText, Copy, Check } from 'lucide-react';

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

  // Prompt Modal state
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const displayName = name ? name.split(' ')[0] : "Founder";

  const aiPromptText = `I want you to help me create a structured profile of my existing company.

Ask me questions one at a time. Do not make assumptions. If my answer is unclear, ask a follow-up question.

Understand these areas:

1. Company name
2. Industry
3. What the company does
4. Main products/services
5. Target customers
6. Current geographic/market presence
7. Business model
8. Pricing/revenue model
9. Current scale (customers, users, locations, revenue, etc., if I know them)
10. Main strengths
11. Current challenges
12. Current business goals
13. Important technical/operational constraints
14. Important competitors or alternatives
15. Anything else that would help evaluate future business decisions

Once you have enough information, DO NOT give me a long explanation.

Return only a structured company profile using exactly this format:

Company Name:
Industry:
What We Do:
Target Customers:
Main Products/Services:
Market/Geographic Presence:
Business Model:
Pricing/Revenue Model:
Current Scale:
Main Strengths:
Current Challenges:
Current Goals:
Important Constraints:
Competitors/Alternatives:
Additional Context:

Use concise, factual statements based only on my answers.`;

  const copyPromptToClipboard = () => {
    navigator.clipboard.writeText(aiPromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Voice to Text handler with interimResults = false & isFinal check
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
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsRecording(true);

        recognition.onresult = (event) => {
          let finalChunk = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalChunk += event.results[i][0].transcript;
            }
          }
          const cleanText = finalChunk.trim();
          if (cleanText) {
            setAboutCompany(prev => (prev ? prev + ' ' : '') + cleanText);
          }
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
        setAboutCompany(prev => (prev ? prev + '\n' : '') + `[Attached File "${file.name}": ${snippet}...]`);
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
      setAboutCompany(prev => (prev ? prev + '\n' : '') + `[Attached File: ${file.name}]`);
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
    <div className="page-content animate-fade-in" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '32px' }}>
      {/* Top Greeting */}
      <div className="greeting-header">
        Hello <strong>{displayName}</strong>,
      </div>

      {/* Main Content Container */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '720px', margin: '0 auto' }}>
        
        {/* Title */}
        <h1 className="page-title" style={{ fontSize: '42px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-1px' }}>
          Tell Us About Your Company.
        </h1>

        {/* Subtitle with Hypertext Prompt Modal Trigger */}
        <div style={{ textAlign: 'center', color: '#444444', fontSize: '15px', lineHeight: '1.5', marginBottom: '28px', maxWidth: '600px' }}>
          <p>Take some time, talk to us about what you own. Not the deep files, but your market, people, business, ...</p>
          <p style={{ marginTop: '6px', fontWeight: '800', color: '#111111' }}>Or</p>
          <button
            type="button"
            onClick={() => setShowPromptModal(true)}
            style={{
              background: 'none',
              border: 'none',
              fontWeight: '800',
              color: '#111111',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '15px',
              fontFamily: 'inherit',
              padding: 0
            }}
          >
            Use this prompt and paste the result
          </button>
        </div>

        <form onSubmit={handleNext} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Your Name Input */}
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

          {/* About Your Company Container */}
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

              {/* Voice Microphone Icon (Top Right) */}
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

            {/* Attached File Badge preview */}
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

            {/* Attachment Paperclip Icon (Bottom Right) */}
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

          {/* Role & Stage fields */}
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

      {/* PROMPT MODAL DIALOG BOX */}
      {showPromptModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            zIndex: 99999,
            padding: '24px'
          }}
          onClick={() => setShowPromptModal(false)}
        >
          <div 
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              maxWidth: '680px',
              width: '100%',
              padding: '32px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              position: 'relative',
              animation: 'fadeIn 0.25s ease',
              margin: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#111111', lineHeight: '1.4', paddingRight: '20px' }}>
                Paste this onto any agent you use and answer the questions and paste the result
              </h3>
              <button 
                type="button"
                onClick={() => setShowPromptModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666666', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Prompt Content */}
            <div 
              style={{ 
                backgroundColor: '#f8fafc', 
                border: '1px solid #e2e8f0', 
                borderRadius: '16px', 
                padding: '20px',
                fontFamily: 'monospace',
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#1e293b',
                whiteSpace: 'pre-wrap',
                maxHeight: '340px',
                overflowY: 'auto',
                marginBottom: '24px'
              }}
            >
              {aiPromptText}
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {copied ? (
                <span style={{ fontSize: '13px', color: '#10b981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={16} /> Copied to clipboard!
                </span>
              ) : (
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  Copy & paste into ChatGPT, Claude, or any AI assistant.
                </span>
              )}

              <button
                type="button"
                onClick={copyPromptToClipboard}
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: '14px', borderRadius: '12px' }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? "Copied!" : "Copy to Clipboard"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FounderInfo;
