import { Link } from "react-router";
import "./Navbar.css"
import { HashLink } from 'react-router-hash-link';

function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{height: "60px"}}>
      <div className="container">
        <Link className="navbar-brand fw-bold m-0" to="/" style={{fontSize: "22px"}}>
          صُحُف
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <form className="d-flex" role="search">
          <input
            className="form-control me-3 shadow-none"
            type="search"
            placeholder="عنوان القصه او الكتاب..."
            aria-label="Search"
          />
          <button className="btn btn-outline-success me-2" type="submit">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                الصفحه الرئيسيه
              </Link>
            </li>
            <li className="nav-item">
              <HashLink className="nav-link" smooth to="/#story-section">
                القصص
              </HashLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                الاقتباسات
              </a>
            </li>
            <li className="nav-item">
              <HashLink className="nav-link" smooth to="/#texts-section">
                النصوص
              </HashLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                مراجعات الكتب
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;