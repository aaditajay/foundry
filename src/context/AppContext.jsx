import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithGoogle, logoutUser, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { sampleIdeas, generateStrategyData } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Screen states: 'SPLASH' | 'LANDING' | 'LOGIN' | 'FOUNDER_INFO' | 'NEW_IDEA' | 'FORGING' | 'COOPERATION' | 'CONFLICT' | 'STRATEGY' | 'PAST_IDEAS'
  const [activeScreen, setActiveScreen] = useState('SPLASH');
  const [user, setUser] = useState(null);
  const [founderInfo, setFounderInfo] = useState({
    role: "Founder & CEO",
    experience: "First-time Founder",
    industry: "Tech / Software"
  });

  // Idea input form fields
  const [ideaInput, setIdeaInput] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Current active strategy data
  const [currentStrategy, setCurrentStrategy] = useState(null);

  // Saved past ideas list
  const [pastIdeas, setPastIdeas] = useState(sampleIdeas);

  // Monitor Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          name: currentUser.displayName || "Founder",
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          isDemo: false
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Trigger Google Sign-In
  const handleGoogleAuth = async () => {
    const res = await signInWithGoogle();
    if (res.success) {
      setUser(res.user);
      setActiveScreen('FOUNDER_INFO');
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setActiveScreen('LANDING');
  };

  // Submit new startup idea and generate strategy
  const handleForgeSubmit = (customIdeaData) => {
    const textToForge = customIdeaData?.ideaInput || ideaInput || "AI-powered platform for startup strategy";
    const locToForge = customIdeaData?.location || location || "Bengaluru, India";
    const budToForge = customIdeaData?.budget || budget || "Flexible Seed Budget";
    
    const strategy = generateStrategyData(textToForge, locToForge, budToForge);
    setCurrentStrategy(strategy);

    // Add to past ideas history
    setPastIdeas(prev => [
      {
        title: strategy.meta.title,
        description: textToForge,
        location: locToForge,
        budget: budToForge,
        additionalInfo: additionalInfo,
        date: strategy.meta.createdAt,
        strategyData: strategy
      },
      ...prev
    ]);

    // Navigate to Forging Agents screen
    setActiveScreen('FORGING');
  };

  // Navigation helper
  const navigate = (screenName) => {
    setActiveScreen(screenName);
  };

  return (
    <AppContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
        navigate,
        user,
        setUser,
        founderInfo,
        setFounderInfo,
        ideaInput,
        setIdeaInput,
        location,
        setLocation,
        budget,
        setBudget,
        additionalInfo,
        setAdditionalInfo,
        currentStrategy,
        setCurrentStrategy,
        pastIdeas,
        handleGoogleAuth,
        handleLogout,
        handleForgeSubmit
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
