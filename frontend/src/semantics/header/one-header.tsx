/*src/semantics/header/one-header.tsx*/
import logo from "../../assets/icons/logo/logo.svg";
import sun from "../../assets/icons/sun/Vector.svg";
import moon from "../../assets/icons/moon/Vector (1).svg"
import { useState } from "react";
export const HeaderM = () => {

    const [theme, setTheme] = useState<"light" | "dark">("dark");

    

    const toggleTheme = () => {
        let newTheme = theme;
        if(newTheme === 'dark'){
            newTheme = 'light';
        } else {
            newTheme = 'dark';
        };

        setTheme(newTheme);

        document.body.dataset.theme = newTheme;
    };

    return(

        <header className="homeheader">

            <img src={logo} alt="logo" className="homeheader__logo"/>

            <div className="homeheader__container">
                
                <button className="homeheader__suncont"  onClick={toggleTheme}>
                    {theme === 'dark' 
                        ? (<img src={sun} alt="sun" className="homeheader__sun"/>)
                        : (<img src={moon} alt="sun" className="homeheader__sun"/>)
                    }
                </button>
            
            </div>
            

        </header>
        
    )
}