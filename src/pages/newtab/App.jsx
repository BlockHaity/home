import React, { useState } from 'react';
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
import Github from './functions/github'

// WMC
import '@material/web/button/filled-tonal-button'
import '@material/web/switch/switch.js'

function App() {
    const [showGithub, setShowGithub] = useState(true);

    return (
        <>
            <div className="top">
                <Search />
            </div>
            <div className="content">
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
                    <Card>
                        <h3>卡片控制</h3>
                        <label style={{ display: 'flex', alignItems: 'center',gap: '10px', cursor: 'pointer'}}>
                            <input 
                                type="checkbox" 
                                checked={showGithub} 
                                onChange={(e) => setShowGithub(e.target.checked)}
                            />
                            GitHub
                        </label>
                    </Card>
                </div>
                <div className="right">
                    {showGithub && <Card><Github /></Card>}
                </div>
            </div>
        </>
    )
}

export default App