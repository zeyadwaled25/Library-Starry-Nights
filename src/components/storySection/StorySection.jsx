import "./StorySection.css";
import { SquarePen, Star, Eye, Clock, Bookmark } from "lucide-react";
import Image from "../../../public/images/اغلال-الوهم.png";
import { useNavigate } from "react-router";

function StorySection() {

  const navigate = useNavigate()

  const stories = [
    {
      id: 1,
      title: "أغلال الوهم",
      cover: "..",
      category: "شريحة من الحياة",
      rating: 4.7,
      readTime: "7 دقائق",
      views: 245,
    },
  ];

  return (
    <div className="story-section py-5" id="story-section">
      <div className="container">
        <div className="heading d-flex justify-content-center align-items-center mb-5 position-relative">
          <h1 className="ms-2">أحدث القصص</h1>
          <SquarePen color="#1a2a47" />
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {stories.map((story) => (
            <div key={story.id} className="col" onClick={() => {
              navigate("/story/:id")
            }}>
              <div className="story-card">
                <div className="story-cover">
                  <img src={Image} alt="غلاف القصة" />
                  <div className="story-info">
                    <div className="story-meta">
                      <span className="story-category">شريحة من الحياة</span>
                      <div className="story-rating">
                        <span className="star-icon">★</span> <span>4.7</span>
                      </div>
                    </div>
                  </div>
                  <button className="bookmark-btn position-absolute top-0 end-0 m-2 bg-transparent border-0">
                    <Bookmark className="bookmark" size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5" onClick={(e) => {e.preventDefault()}}>
          <a href="#" className="view-more-btn">عرض المزيد من القصص</a>
        </div>
      </div>
    </div>
  );
}

export default StorySection;