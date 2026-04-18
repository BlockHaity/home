import './App.css'

// init material theme
import "../../material-theme/dark.css"
import "../../material-theme/dark-mc.css"
import "../../material-theme/dark-hc.css"


// components
import Search from '../../components/search'
import Card from '../../components/Card'
import Time from '../../components/time'
import Icon from '../../components/Icon'

// WMC
import '@material/web/button/filled-tonal-button'

function App() {
    return (
        <>
            <Search />
            <div className="container">
                <div className="left">
                    <Card>
                        <h3>Hi,BlockHaity</h3>
                        <p>现在是：</p>
                        <Time />
                    </Card>
                    <Card>
                        <h3>快捷链接</h3>
                        <div className="links">
                            <md-filled-tonal-button>GitHub</md-filled-tonal-button>
                            <md-filled-tonal-button>CloudFlare</md-filled-tonal-button>
                            <md-filled-tonal-button>BiliBili</md-filled-tonal-button>
                            <md-filled-tonal-button>DeepSeek</md-filled-tonal-button>
                        </div>
                    </Card>
                </div>
                <div className="right"></div>
            </div>
        </>
    )
}

export default App