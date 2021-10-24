import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import Button from '@mui/material/Button'

import ModalDetail from './ModalDetail'

const Votes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const handleActionOnClick = () => setIsModalOpen(true)
  const handleDetailOnClick = () => setIsModalOpen(true)
  const handleModalClose = () => setIsModalOpen(false)

  const createData = (topic, status, result) => ({ topic, status, result })

  const rows = [
    createData('下週五換誰分享？', '可投票', ''),
    createData('今年員工旅遊投票', '已結束', '新屋'),
    createData('中午要吃什麼？', '已結束', '麥當勞'),
  ]

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
          {rows.map(({ topic, status, result }, index) => (
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
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default Votes
