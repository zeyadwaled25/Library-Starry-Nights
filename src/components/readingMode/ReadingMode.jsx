import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Type, Moon, Sun, Minus, Plus, Bookmark } from "lucide-react";
import "./ReadingMode.css";

function ReadingMode() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState(18);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [story, setStory] = useState({
    id: 1,
    title: "أغلال الوهم",
    author: "شعيب البلوشى",
    content: "",
  });

  useEffect(() => {
    // استرداد المحتوى من localStorage
    const cachedStory = localStorage.getItem(`story_${id}`);
    
    if (cachedStory) {
      try {
        const parsedStory = JSON.parse(cachedStory);
        setStory(prev => ({
          ...prev,
          title: parsedStory.title || prev.title,
          author: parsedStory.author || prev.author,
          content: parsedStory.content || "",
        }));
        setIsLoading(false);
      } catch (err) {
        console.error("Error parsing cached story:", err);
        setError("حدث خطأ أثناء استرداد المحتوى");
        setIsLoading(false);
      }
    } else {
      setError("لم يتم العثور على محتوى القصة. الرجاء العودة إلى صفحة التفاصيل أولاً.");
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    return () => {
      document.body.classList.remove('dark-mode');
    };
  }, [isDarkMode]);

  const increaseFontSize = () => {
    if (fontSize < 28) {
      setFontSize(fontSize + 2);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 14) {
      setFontSize(fontSize - 2);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const goBack = () => {
    navigate(`/story/${id}`);
  };

  if (isLoading) {
    return (
      <div className="loading-container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">جاري التحميل...</span>
          </div>
          <div>جاري تحميل القصة...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container text-center py-5">
        <div className="alert alert-danger">{error}</div>
        <button className="btn btn-primary" onClick={goBack}>
          العودة إلى صفحة القصة
        </button>
      </div>
    );
  }

  return (
    <div className={`reading-mode ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="reading-controls">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <button className="control-btn back-btn" onClick={goBack}>
              <ArrowLeft size={20} />
              <span className="ms-2">العودة</span>
            </button>
            
            <div className="reading-controls-center d-flex">
              <button className="control-btn" onClick={decreaseFontSize}>
                <Minus size={20} />
              </button>
              <button className="control-btn">
                <Type size={20} />
              </button>
              <button className="control-btn" onClick={increaseFontSize}>
                <Plus size={20} />
              </button>
              <button className="control-btn" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            
            <button 
              className="control-btn bookmark-btn"
              onClick={toggleBookmark}
            >
              <Bookmark 
                size={20} 
                fill={isBookmarked ? "#1a2a47" : "none"}
                stroke={isDarkMode ? "#fff" : "#1a2a47"}
              />
            </button>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="story-content-container">
          <h1 className="story-title mb-3">{story.title}</h1>
          <p className="story-author mb-5">بقلم: {story.author}</p>
          
          <div 
            className="story-content" 
            style={{ fontSize: `${fontSize}px` }}
            dangerouslySetInnerHTML={{ __html: story.content }}
          />
          
          <div className="story-end-mark mt-5">
            <span>• • •</span>
          </div>
          
          <div className="reading-footer mt-5">
            <button className="back-to-details-btn" onClick={goBack}>
              العودة لصفحة القصة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadingMode;