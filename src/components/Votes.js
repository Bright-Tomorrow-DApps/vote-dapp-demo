import { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import Button from '@mui/material/Button'

import ModalDetail from './ModalDetail'

import Web3 from 'web3'
import VoteDApp from '../abis/VoteDApp.json'

const Votes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const [isLoadWeb3, setIsLoadWeb3] = useState(false)
  const handleActionOnClick = () => setIsModalOpen(true)
  const handleDetailOnClick = () => setIsModalOpen(true)
  const handleModalClose = () => setIsModalOpen(false)

  const createData = (topic, status, result) => ({ topic, status, result })

  const rows = [
    createData('下週五換誰分享？', '可投票', ''),
    createData('今年員工旅遊投票', '已結束', '新屋'),
    createData('中午要吃什麼？', '已結束', '麥當勞'),
  ]

  const [account, setAccount] = useState()
  const [votes, setVotes] = useState([])

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
      const web3 = window.web3
      const accounts = await web3.eth.getAccounts()

      // setAccount(accounts[0])
      console.log('aaaaa', 'account', accounts)
      const networkId = 4

      // load dapp json
      const voteDAppData = VoteDApp.networks[networkId]
      if (!voteDAppData) return
      const voteDApp = new web3.eth.Contract(VoteDApp.abi, voteDAppData.address)
      const vote = await voteDApp.methods.getVote(1).call()
      console.log('aaaaaa', 'vote', vote)

      // load votes table
      let voteList = []
      const voteID = await voteDApp.methods.voteID().call()
      console.log('aaaaaa', 'voteID', voteID) // 2

      for (let i = 1; i <= voteID; i++) {
        const vote = await voteDApp.methods.getVote(i).call()
        voteList.push({
          topic: vote[0],
          isFinished: vote[1],
          result: vote[2],
          starterAddress: vote[3],
          numProposals: vote[5],
        })
      }
      console.log('aaaa', 'voteList', voteList)
      setVotes(voteList)
    }

    loadWeb3()
    fetchData()
    setIsLoadWeb3(true)
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Topic</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Result</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {votes.map(({ topic, status, result }, index) => (
            <TableRow key={topic} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{rows.length - index}</TableCell>
              <TableCell component="th" scope="row">
                {topic}
              </TableCell>

              <TableCell>{status}</TableCell>
              <TableCell>{result}</TableCell>
              <TableCell>
                <Button onClick={handleActionOnClick}>Action</Button>
                <Button onClick={handleDetailOnClick}>Detail</Button>
                <ModalDetail
                  isModalOpen={isModalOpen}
                  handleModalClose={handleModalClose}
                  modalContent={modalContent}
                />
              </TableCell>
            </TableRow>
          ))}

          {rows.map(({ topic, isFinished, result }, index) => (
            <TableRow key={topic} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{rows.length - index}</TableCell>
              <TableCell component="th" scope="row">
                {topic}
              </TableCell>

              <TableCell>{isFinished}</TableCell>
              <TableCell>{result}</TableCell>
              <TableCell>
                <Button onClick={handleActionOnClick}>Action</Button>
                <Button onClick={handleDetailOnClick}>Detail</Button>
                <ModalDetail
                  isModalOpen={isModalOpen}
                  handleModalClose={handleModalClose}
                  modalContent={modalContent}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default Votes
