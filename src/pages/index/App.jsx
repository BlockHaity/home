import './App.css'

// init material theme
import "../../material-theme/dark.css"
import "../../material-theme/dark-mc.css"
import "../../material-theme/dark-hc.css"

// components
import Card from '../../components/Card'
import Avatar from '../../components/Avater'
import Icon from '../../components/Icon'

// WMC
import "@material/web/button/filled-button"

// Markdowns
import About from './contexts/about'
import Power from './contexts/power'
import Github from './contexts/github'

function App() {

  return (
    <div className="container dark">
      <div className="left">
        <Card style={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          padding: '30px',
          gap: '10px'
        }}>
          <Avatar />
          <h2>BlockHaity</h2>
          <p>一个坐牢高中牲</p>
          <md-filled-button onClick={() => window.open('https://github.com/BlockHaity', '_blank')}>
            <Icon icon="Github" />
            Github
          </md-filled-button>
          <md-filled-button onClick={() => window.open('https://bas.blockhaity.qzz.io', '_blank')}>
            <Icon icon="Blog" />
            个人博客
          </md-filled-button>
          <md-filled-button onClick={() => window.open('https://api.blockhaity.qzz.io', '_blank')}>
            <Icon icon="Api" />
            API
          </md-filled-button>
        </Card>
      </div>
      <div className="right" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Card style={{ width: 'auto', height: 'auto' }}><About /></Card>
        <Card style={{ width: 'auto', height: 'auto' }}><Power /></Card>
        <Card style={{ width: 'auto', height: 'auto' }}><Github /></Card>
      </div>
    </div>
  )
}

export default App
