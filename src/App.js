import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Votes from './components/Votes'
import Container from '@mui/material/Container'

function App() {
  return (
    <div className="App">
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Bright Tomorrow Coin 光明幣
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        {' '}
        <Votes />
      </Container>
    </div>
  )
}

export default App
