import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Clock, Eye, Bookmark, BookOpen, Share2, MessageCircle, Instagram } from "lucide-react";
import mammoth from "mammoth";
import storyImage from "../../../public/images/اغلال-الوهم.png";
import "./StoryDetail.css";

function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [story, setStory] = useState({
    id: 1,
    title: "أغلال الوهم",
    cover: storyImage,
    category: "شريحة من الحياة",
    rating: 4.7,
    readTime: "7 دقائق",
    views: 245,
    author: "شعيب البلوشى",
    publishDate: "2025-01-15",
    summary:
      "تدور القصة حول شابين أخوين تربيا في دار أيتام، يختلفان في طباعهما وتوجهاتهما. الأخ الأكبر يترك أخاه الأصغر وحيدًا، مما يدفعه إلى مواجهة صعوبات الحياة بمفرده.",
    content: ""
  });

  useEffect(() => {
    const loadStoryFromFile = async () => {
      try {
        // محاولة استرداد المحتوى من localStorage
        const cachedStory = localStorage.getItem(`story_1`);
        
        if (cachedStory) {
          const parsedStory = JSON.parse(cachedStory);
          setStory(prev => ({
            ...prev,
            content: parsedStory.content,
          }));
          setIsLoading(false);
          return;
        }
        
        const response = await fetch(`/stories/story_1.docx`);
        if (!response.ok) throw new Error("ملف القصة غير موجود");

        const arrayBuffer = await response.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });

        if (result.value) {
          const updatedStory = {
            ...story,
            content: result.value,
          };
          
          setStory(updatedStory);
          
          // تخزين المحتوى في localStorage
          localStorage.setItem(`story_1`, JSON.stringify({
            title: updatedStory.title,
            author: updatedStory.author,
            content: result.value
          }));
        }
      } catch (err) {
        console.error("Error loading story:", err);
        setError(err.message || "حدث خطأ أثناء تحميل القصة.");
      } finally {
        setIsLoading(false);
      }
    };

    loadStoryFromFile();
  }, [id]);

  const handleReadingMode = () => navigate(`/story/${id}/read`);
  const toggleBookmark = () => setIsBookmarked(prev => !prev);
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.summary,
        url: window.location.href
      });
    }
  };

  const handleComment = () => {
    console.log("Comment functionality to be implemented");
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
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          حاول مرة أخرى
        </button>
      </div>
    );
  }

  return (
    <div className="story-detail-section py-5">
      <div className="container">
        <div className="row">
          {/* Cover & Stats */}
          <div className="col-lg-4 mb-4">
            <div className="story-cover-container position-relative">
              <img src={story.cover} alt={story.title} className="img-fluid rounded shadow" />
              <button
                className="bookmark-btn position-absolute top-0 end-0 m-3 bg-light rounded-circle p-2 border-0"
                onClick={toggleBookmark}
                aria-label={isBookmarked ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
              >
                <Bookmark
                  className={isBookmarked ? "bookmark-filled" : "bookmark"}
                  size={24}
                  fill={isBookmarked ? "#1a2a47" : "none"}
                  stroke="#1a2a47"
                />
              </button>
            </div>

            <div className="story-stats mt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="category-badge">{story.category}</div>
                <div className="rating">
                  <Star className="star-icon" size={18} fill="#FFD700" stroke="#FFD700" />
                  <span className="ms-1">{story.rating}</span>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="read-time">
                  <Clock size={16} className="me-1" />
                  <span>{story.readTime}</span>
                </div>
                <div className="views">
                  <Eye size={16} className="me-1" />
                  <span>{story.views} مشاهدة</span>
                </div>
              </div>
            </div>

            <button
              className="read-mode-btn w-100 mt-4 py-3 d-flex align-items-center justify-content-center"
              onClick={handleReadingMode}
            >
              <BookOpen size={20} className="me-2" />
              <span>وضع القراءة</span>
            </button>
          </div>

          {/* Content */}
          <div className="col-lg-8">
            <h1 className="story-title mb-3">{story.title}</h1>

            <div className="story-meta mb-4">
              <div className="author">بقلم: {story.author} <a href="https://www.instagram.com/a1o9?igsh=aG51NmU4emE4YmYz" target="_blank"><Instagram /></a></div>
              <div className="publish-date">نُشر في: {story.publishDate}</div>
            </div>

            <div className="story-summary mb-4">
              <h4>نبذة عن القصة</h4>
              <p>{story.summary}</p>
            </div>

            <div className="story-preview">
              <h4>مقتطف من القصة</h4>
              <div
                className="preview-text"
                dangerouslySetInnerHTML={{
                  __html: story.content
                    ? story.content.substring(0, 200) + "..."
                    : "<em>لا يوجد محتوى متاح</em>"
                }}
              />
              <button className="continue-reading-btn mt-3" onClick={handleReadingMode}>
                متابعة القراءة
              </button>
            </div>

            <div className="story-actions mt-5">
              <div className="row">
                <div className="col-6">
                  <button
                    className="share-btn w-100 py-2 d-flex align-items-center justify-content-center"
                    onClick={handleShare}
                  >
                    <Share2 size={18} className="me-2" />
                    مشاركة
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="comment-btn w-100 py-2 d-flex align-items-center justify-content-center"
                    onClick={handleComment}
                  >
                    <MessageCircle size={18} className="me-2" />
                    تعليق
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryDetail;