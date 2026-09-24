import { NavLink } from 'react-router'
import { Header } from '../components/Header'
import './404.css'

export function NotFoundPage() {
  return (
    <>  
    <link rel="icon" type="image/svg+xml" href="images/favicon/home-favicon.png" />
    <title>404 Not Found</title>
    <Header />
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-text">404</div>
        <div className="not-found-subtext">Page Not Found</div>
        <div className="not-found-description">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </div>
        <NavLink className="return-to-home-link" to="/">
          Return to Homepage
        </NavLink>
        </div>
        </div>
    </>
    );
}