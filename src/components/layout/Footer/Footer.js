import React from 'react';
import '../Footer/Footer.css'

export const Footer = () => {
  return (
    <div>
  <div className="footer-area">
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <h4 className="footer-heading">Devang E-Commerce</h4>
          <div className="footer-underline" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
        </div>
        <div className="col-md-3">
          <h4 className="footer-heading">Quick Links</h4>
          <div className="footer-underline" />
          <div className="mb-2">
            <a href="" className="text-white">
              Home
            </a>
          </div>
          <div className="mb-2">
            <a href="" className="text-white">
              About Us
            </a>
          </div>
          <div className="mb-2">
            <a href="" className="text-white">
              Contact Us
            </a>
          </div>
          <div className="mb-2">
            <a href="" className="text-white">
              Blogs
            </a>
          </div>
          <div className="mb-2">
            <a href="" className="text-white">
              Sitemaps
            </a>
          </div>
        </div>
        <div className="col-md-3">
          <h4 className="footer-heading">Shop Now</h4>
          <div className="footer-underline" />
          <div className="mb-2">
            <a href="" className="text-white">
              Collections
            </a>
          </div>
          <div className="mb-2">
            <a href="" className="text-white">
              Trending Products
            </a>
          </div>
          <div className="mb-2">
            <a href="" className="text-white">
              New Arrivals Products
            </a>
          </div>
          <div className="mb-2">
            <a href="" className="text-white">
              Featured Products
            </a>
          </div>
          <div className="mb-2">
            <a href="" className="text-white">
              Cart
            </a>
          </div>
        </div>
        <div className="col-md-3">
          <h4 className="footer-heading">Reach Us</h4>
          <div className="footer-underline" />
          <div className="mb-2">
            <p>
              <i className="fa fa-map-marker" /> 444, Gujrat, india - 223134
            </p>
          </div>
          <div className="mb-2">
            <a href="" className="text-white">
              <i className="fa fa-phone" /> +91 971-281-5372
            </a>
          </div>
          <div className="mb-2">
            <a href="devangpatel6432@gmail.com" className="text-white">
              <i className="fa fa-envelope" /> devangpatel6432@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="copyright-area">
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <p className="">
            {" "}
            © 2023 - Devang Patel - Ecommerce. All rights reserved.
          </p>
        </div>
        <div className="col-md-4">
          <div className="social-media">
            Get Connected:
            <a href="" target='_blank'>
              <i className="fa fa-facebook" />
            </a>
            <a href="" target='_blank'>
              <i className="fa fa-twitter" />
            </a>
            <a href="https://www.instagram.com/_whoisdevang/" target='_blank'>
              <i className="fa fa-instagram" />
            </a>
            <a href="https://www.linkedin.com/in/devang07/" target='_blank'>
              <i className="fa fa-linkedin" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};