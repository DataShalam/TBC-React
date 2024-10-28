import Link from "next/link";
import "./signIn.css";

import { authenticate } from "../../lib/actions.js";

export default function SignIn() {
  return (
    <div className="signin-box">
      <div className="signin-box-header">
        <h5 className="signin-title">LogIn</h5>
      </div>
      <form action={authenticate}>
        <div className="input-box">
          <label htmlFor="email"></label>
          <input
            type="text"
            className="input-field"
            placeholder="Email"
            required
            name="email"
            id="email"
          />
        </div>
        <div className="input-box">
          <label htmlFor="pass"></label>
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            required
            id="pass"
            name="password"
          />
        </div>
        <div className="singin-forget">
          <section>
            <input type="checkbox" />
            <label htmlFor="check">Remember me</label>
          </section>
          <section>
            <Link href="/forgot-password">Forgot password</Link>
          </section>
        </div>
        <div className="singin-submit-wrapper">
          <button
            className="signin-submit-btn"
            id="submit"
            type="submit"
            htmlFor="submit"
          >
            Sign In
          </button>
        </div>
        <div className="signup-link">
          <p>
            Do not have account ? <Link href="/signUp">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
