import React from "react";
import "./contact.css";

export default function Contact() {
  return (
    <main className="contact-container">
      <div className="title-wrapper">
        <h1 className="title">Contact</h1>
      </div>
      <section className="contact-wrapper">
        <div className="contact">
          <div className="contact-text">Let’s Be in Touch</div>
        </div>
        <div className="submit-form">
          <form>
            <div className="label-wrapper">
              <input type="text" id="username" />
              <label htmlFor="username">Name</label>
            </div>

            <div className="label-wrapper">
              <input type="text" id="email" />
              <label htmlFor="email">Email</label>
            </div>

            <div className="label-wrapper">
              <input type="tel" id="secondname" required />
              <label htmlFor="tel">Mobile</label>
            </div>

            <div className="label-wrapper">
              <textarea id="text" required />
              <label htmlFor="text">Text</label>
            </div>

            <button type="submit">Send</button>
          </form>
        </div>
      </section>
    </main>
  );
}
