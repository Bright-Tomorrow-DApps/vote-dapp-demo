import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Votes from './components/Votes'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

import Web3 from 'web3'
import VoteDApp from './abis/VoteDApp.json'

function App() {
  const [account, setAccount] = useState()
  const [voteDApp, setVoteDApp] = useState()

  useEffect(() => {
    async function loadWeb3() {
      console.log('loadWeb3')
      if (window.ethereum) {
        console.log('first')
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      } else if (window.web3) {
        console.log('second')
        window.web3 = new Web3(window.web3.currentProvider)
      } else {
        console.log('last')
        window.alert('change browser, please')
      }
    }

    async function fetchData() {
      const networkId = 4
      const accounts = await window.web3.eth.getAccounts()

      setAccount(accounts[0])

      // load dapp json
      const voteDAppData = VoteDApp.networks[networkId]
      if (!voteDAppData) return
      const voteDApp = new window.web3.eth.Contract(VoteDApp.abi, voteDAppData.address)
      setVoteDApp(voteDApp)
    }

    loadWeb3()
    fetchData()
  }, [])

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
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Bright Tomorrow 光明幣投票平台POC - use Ethereum Rinkeby testnet
          </Typography>
          {account ? account : <Button color="inherit">Connect Wallet</Button>}
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Votes account={account} voteDApp={voteDApp} />
      </Container>
    </div>
  )
}

export default App
