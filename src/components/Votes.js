import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const Votes = () => {
  const createData = (topic, status, result, action) => ({ topic, status, result, action })

  const rows = [
    createData('下週五換誰分享？', 1, 6.0, 24, 4.0),
    createData('今年員工旅遊投票', 2, 9.0, 37, 4.3),
    createData('中午要吃什麼？', 3, 16.0, 24, 6.0),
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
          {rows.map(({ topic, status, result, action }) => (
            <TableRow key={topic} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{status}</TableCell>
              <TableCell component="th" scope="row">
                {topic}
              </TableCell>

              <TableCell>{status}</TableCell>
              <TableCell>{result}</TableCell>
              <TableCell>{action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default Votes
