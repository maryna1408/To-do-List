import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
              <a href="/" className="logo">
            Logo
          </a>
          <ul className="nav">
              <a href="/add">Add todo</a>
          </ul>
        </nav>
      </div>
    </header>
  );
}
