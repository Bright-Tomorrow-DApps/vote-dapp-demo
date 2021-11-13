import { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import ModalDetail from './ModalDetail'

const Votes = ({ account, voteDApp }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [votes, setVotes] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const [voteTopic, setVoteTopic] = useState('')
  const [voteProposal, setVoteProposal] = useState('')

  const handleAddressesOnClick = (addresses) => () => {
    setModalContent(addresses?.map((item, index) => <Box key={index}>{item}</Box>))
    setIsModalOpen(true)
  }
  const handleModalClose = () => setIsModalOpen(false)

  const handleCreateVoteOnClick = () => {
    setIsLoading(true)
    voteDApp.methods
      .createVote(voteTopic)
      .send({ from: account })
      .on('transactionHash', (hash) => {
        console.log('aaaaaa', 'transactionHash', hash)
        setVoteTopic('')
        setIsLoading(false)
      })
      .on('receipt', (receipt) => {
        // get confirmation - should re-render
        console.log('aaaaaa', 'receipt', receipt)
        fetchVotes()
      })
  }

  const handleCreateProposalOnClick = (voteID) => () => {
    setIsLoading(true)
    voteDApp.methods
      .addProposalToVote(voteID, voteProposal)
      .send({ from: account })
      .on('transactionHash', (hash) => {
        console.log('aaaaaa', 'transactionHash', hash)
        setVoteProposal('')
        setIsLoading(false)
      })
      .on('receipt', (receipt) => {
        // get confirmation - should re-render
        console.log('aaaaaa', 'receipt', receipt)
        fetchVotes()
      })
  }

  async function fetchVotes() {
    let voteList = []
    const voteID = await voteDApp.methods.voteID().call()

    for (let i = 1; i <= voteID; i++) {
      const {
        0: topic,
        1: isFinished,
        2: result,
        3: starterAddress,
        4: numProposals,
      } = await voteDApp.methods.getVote(i).call()

      let proposals = []
      for (let j = 1; j <= Number(numProposals); j++) {
        const { 0: proposal, 1: addresses } = await voteDApp.methods.getVoteProposal(i, j).call()
        console.log('aaaaaa', 'proposal', proposal)
        proposals.push({ proposal: proposal, addresses: addresses })
      }

      voteList.unshift({
        id: i,
        topic: topic,
        isFinished: isFinished,
        result: result,
        starterAddress: starterAddress,
        numProposals: Number(numProposals),
        proposals: proposals,
      })
    }

    setVotes(voteList)
  }

  useEffect(() => {
    if (voteDApp) fetchVotes()
  }, [voteDApp])

  return (
    <>
      <Box sx={{ marginTop: '12px' }}>
        <TextField
          label="Create Vote"
          variant="standard"
          onChange={(event) => setVoteTopic(event.target.value)}
        />
        <Button onClick={handleCreateVoteOnClick}>Create Vote</Button>
        {isLoading && <Box sx={{ float: 'right' }}>isLoading...</Box>}
      </Box>

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
            {votes.map(({ id, topic, status, result, proposals }, index) => (
              <TableRow key={topic} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{votes.length - index}</TableCell>
                <TableCell component="th" scope="row">
                  {topic}
                </TableCell>

                <TableCell>{status}</TableCell>
                <TableCell>{result}</TableCell>
                <TableCell>
                  <TextField
                    label="Proposal"
                    variant="standard"
                    onChange={(event) => setVoteProposal(event.target.value)}
                  />
                  <Button onClick={handleCreateProposalOnClick(id)}>
                    Create Proposal {voteProposal}
                  </Button>
                  {proposals?.map(({ proposal, addresses }) => (
                    <Box key={proposal}>
                      * {proposal} <Button>Vote</Button> 目前
                      {addresses.length}票
                      {addresses.length > 0 && (
                        <Button onClick={handleAddressesOnClick(addresses)}>Addresses</Button>
                      )}
                    </Box>
                  ))}

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
    </>
  )
}
export default Votes
