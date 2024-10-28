import Link from "next/link";
import "./signUp.css";

export default function SignUp() {
  return (
    <div className="signup-box">
      <div className="signup-box-header">
        <h5 className="signup-title">Sign Up</h5>
      </div>
      <form className="signup-form">
        <div className="signup-input-box">
          <label htmlFor="username"></label>
          <input
            type="text"
            className="signup-input-field"
            placeholder="Username"
            required
            name="username"
            id="username"
          />
        </div>
        <div className="signup-input-box">
          <label htmlFor="email"></label>
          <input
            type="email"
            className="signup-input-field"
            placeholder="Email"
            required
            name="email"
            id="email"
          />
        </div>
        <div className="signup-input-box">
          <label htmlFor="password"></label>
          <input
            type="password"
            className="signup-input-field"
            placeholder="Password"
            required
            name="password"
            id="password"
          />
        </div>
        <div className="signup-input-box">
          <label htmlFor="confirm_password"></label>
          <input
            type="password"
            className="signup-input-field"
            placeholder="Confirm Password"
            required
            name="confirm_password"
            id="confirm_password"
          />
        </div>
        <div className="submit-wrapper">
          <button
            className="submit-btn"
            id="submit"
            type="submit"
            htmlFor="submit"
          >
            Sign Up
          </button>
        </div>
        <div className="sign-in-link">
          <p>
            Already have an account? <Link href="/signIn">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
