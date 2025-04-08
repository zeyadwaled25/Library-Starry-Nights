import "./HeroSection.css"

function HeroSection() {

  return (
    <div
      className="hero-section d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="container">
        <div className="hero-content text-center">
          <h1 className="mb-3 display-3" style={{ textShadow: "0 5px 20px #000" }}>
            صُحُف
          </h1>
          <p className="text-dark w-75 m-auto">
          في هذا الفضاء الأزرق العميق، تتلألأ الكلمات كنجومٍ منسوجة من ضوء القمر، وكل قصة هي نجمٌ يضيء سماء الإبداع.
          </p>
          <div className="input-group input-group-lg mt-5 search-container">
            <span className="input-group-text search-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="text"
              className="form-control shadow-none search-input"
              placeholder="ابحث عن عنوان القصه او الكتاب او الاقتباس..."
              aria-label="Search"
            />
          </div>
          <div className="featured-categories mt-5">
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <a href="#" className="category-pill">القصص</a>
              <a href="#" className="category-pill">الأقتبسات</a>
              <a href="#" className="category-pill">النصوص</a>
              <a href="#" className="category-pill">مراجعات الكتب</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;