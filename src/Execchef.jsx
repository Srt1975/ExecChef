import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './Execchef.css'


function App() {
    return (
        <>
           <section id="welcome">
             <div className = "title">
               <h1>Welcome to the ExecChef Suite</h1>
             </div>
               <p>Execchef is an suite of tools for running and managing your foodservice operations. </p>
               <p>With ExecChef, you can streamline your kitchen operations, manage your inventory, and improve your customer experience.</p>
           </section>

           <section id="features">
                <div className="features">
                    <h2>Features</h2>
                </div>

                <button
                    onClick={() => console.log('Pressed')}
                    className="recipe-button"
                    aria-label="Open Recipe Manager"
                >
                    Recipe Manager
                </button>
            </section>

            <footer>
                <p>&copy; 2023 ExecChef. All rights reserved.</p>
                <p>Proudly built by S&A Thomure Enterprises LLC</p>
                <p>Using React and Vite.</p>
                <div className="footer-links" aria-label="Technology links">
                    <a href="https://react.dev/" target="_blank" rel="noreferrer">
                        <img src={reactLogo} className="footer-logo" alt="React logo" />
                    </a>
                    <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                        <img src={viteLogo} className="footer-logo" alt="Vite logo" />
                    </a>
                </div>
            </footer>
        </>
    )
}


export default App