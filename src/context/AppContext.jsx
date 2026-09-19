import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithGoogle, logoutUser, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { sampleIdeas, generateStrategyData } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Screen states: 'SPLASH' | 'LANDING' | 'LOGIN' | 'FOUNDER_INFO' | 'NEW_IDEA' | 'FORGING' | 'COOPERATION' | 'CONFLICT' | 'STRATEGY' | 'PAST_IDEAS'
  const [activeScreen, setActiveScreen] = useState('SPLASH');
  const [isTransitioningFromSplash, setIsTransitioningFromSplash] = useState(false);
  const [user, setUser] = useState(null);
  
  // Track if current user is a previously registered founder
  const [isRegisteredFounder, setIsRegisteredFounder] = useState(() => {
    return localStorage.getItem('foundry_founder_registered') === 'true';
  });

  const [founderInfo, setFounderInfo] = useState(() => {
    const saved = localStorage.getItem('foundry_founder_info');
    return saved ? JSON.parse(saved) : {
      name: "",
      role: "Founder & CEO",
      experience: "First-time Founder",
      industry: "Tech / Software"
    };
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
          name: currentUser.displayName || founderInfo.name || "Founder",
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          isDemo: false
        });
      }
    });
    return () => unsubscribe();
  }, [founderInfo.name]);

  // Trigger Google Sign-In with returning user routing check
  const handleGoogleAuth = async () => {
    const res = await signInWithGoogle();
    if (res.success) {
      setUser(res.user);

      // Check if user has previously registered their founder info
      const alreadyRegistered = localStorage.getItem('foundry_founder_registered') === 'true';
      if (alreadyRegistered) {
        setActiveScreen('NEW_IDEA');
      } else {
        setActiveScreen('FOUNDER_INFO');
      }
    }
  };

  // Complete founder info registration
  const handleSaveFounderInfo = (infoData) => {
    const updated = { ...founderInfo, ...infoData };
    setFounderInfo(updated);
    setIsRegisteredFounder(true);
    localStorage.setItem('foundry_founder_info', JSON.stringify(updated));
    localStorage.setItem('foundry_founder_registered', 'true');
    setActiveScreen('NEW_IDEA');
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

  // Transition helper from Splash to Landing with animation flag
  const transitionFromSplash = () => {
    setIsTransitioningFromSplash(true);
    setActiveScreen('LANDING');
    setTimeout(() => {
      setIsTransitioningFromSplash(false);
    }, 800);
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
        transitionFromSplash,
        isTransitioningFromSplash,
        user,
        setUser,
        founderInfo,
        setFounderInfo,
        handleSaveFounderInfo,
        isRegisteredFounder,
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
