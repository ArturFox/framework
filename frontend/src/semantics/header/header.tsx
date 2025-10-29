/*src/semantics/header/one-header.tsx*/

import logo from '../../assets/icons/logo/logo.svg';
import sun from '../../assets/icons/sun/Vector.svg';
import moon from '../../assets/icons/moon/Vector (1).svg';
import { useEffect, useState } from 'react';

export const HeaderM = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('status') as 'light' | 'dark' | null;
    const currentTheme = savedTheme || 'dark';
    setTheme(currentTheme);
    document.body.dataset.theme = currentTheme;
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      document.body.dataset.theme = newTheme;
      localStorage.setItem('status', newTheme);
      return newTheme;
    });
  };

  return (
    <header className="homeheader">
      <div>
        <img src={logo} alt="logo" className="homeheader__logo" />
      </div>

      <button className="homeheader__conteiner" onClick={toggleTheme}>
        {theme === 'dark' ? (
          <img src={sun} alt="sun" className="homeheader__icon" />
        ) : (
          <img src={moon} alt="moon" className="homeheader__icon" />
        )}
      </button>
    </header>
  );
};
