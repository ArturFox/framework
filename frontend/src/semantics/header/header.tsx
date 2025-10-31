/* src/semantics/header/one-header.tsx */

import { useEffect } from 'react'
import { myStore } from '@/store/useStore'
import logo from '../../assets/icons/logo/logo.svg'
import moon from '../../assets/icons/moon/Vector (1).svg'
import sun from '../../assets/icons/sun/Vector.svg'
import styles from '../../assets/styles/blocks/header.module.scss'

export function HeaderM() {
  const theme = myStore(state => state.theme)
  const setTheme = myStore(state => state.setTheme)

  useEffect(() => {
    const savedTheme = localStorage.getItem('status') as 'light' | 'dark' | null
    const currentTheme = savedTheme || 'dark'
    const timeoutId = setTimeout(() => setTheme(currentTheme), 0)
    document.body.dataset.theme = currentTheme
    return () => {
      clearTimeout(timeoutId)
    }
  }, [setTheme])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.body.dataset.theme = newTheme
    localStorage.setItem('status', newTheme)
  }

  return (
    <header className={`${styles.homeheader} ${theme === 'light' ? styles.light : ''}`}>
      <div>
        <img src={logo} alt="logo" className={styles.logo} />
      </div>

      <button type="button" className={styles.conteiner} onClick={toggleTheme}>
        {theme === 'dark'
          ? (
              <img src={sun} alt="sun" className={styles.icon} />
            )
          : (
              <img src={moon} alt="moon" className={styles.icon} />
            )}
      </button>
    </header>
  )
}
