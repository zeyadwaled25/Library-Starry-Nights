import React from "react";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <h3 className="footer-title">صُحُف</h3>
            <p className="footer-text col-12 col-lg-10">
              كل قصة، كل نص، كل اقتباس، هو نجمٌ فريدٌ يُضيء هذه اللوحة الرقمية. أنت، أيها الزائر، لست مجرد متصفح، بل فنانٌ يشارك في رسم هذه اللوحة الكونية. انثر كلماتك، دعها تتراقص مع النجوم، وشارك العالم رؤيتك الفريدة. هنا، لا حدود للخيال، ولا قيود على الإبداع.
            </p>
          </div>
          <div className="col-lg-4 mb-4">
            <h5 className="footer-title">روابط سريعة</h5>
            <ul className="footer-links">
              <li><a href="#">الصفحة الرئيسية</a></li>
              <li><a href="#">القصص</a></li>
              <li><a href="#">الاقتباسات</a></li>
              <li><a href="#">النصوص</a></li>
              <li><a href="#">مراجعات الكتب</a></li>
            </ul>
          </div>
          <div className="col-lg-4 mb-4">
            <h5 className="footer-title">تواصل معنا</h5>
            <div className="social-icons">
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="https://www.instagram.com/upa0?igsh=MWhwMzBrYnoxeGlpNQ==" target="_blank"><Instagram size={20} /></a>
              <a href="#"><Mail size={20} /></a>
            </div>
            <div className="quote-of-day">
              <p>"الكتب نوافذ نطل منها على عوالم لا حدود لها، والقراءة هي المفتاح"</p>
            </div>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} <span>صُحُف</span> - جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}

export default Footer;