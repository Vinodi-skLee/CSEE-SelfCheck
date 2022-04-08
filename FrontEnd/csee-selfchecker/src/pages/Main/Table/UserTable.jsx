import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SelfCheckUserTable from '../../SelfCheck/Table/SelfCheckUserTable';
import { TableLayout } from '../main.styled';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#2E75B6',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 20,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const TableStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function MyPageTable() {
  const classes = TableStyles();
  const [userData, setUserData] = useState({});
  const { state } = useLocation();
  const history = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/user/info?userId=${state.userId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.res);
        console.log('state is');
        console.log(state);
        console.log('result is');
        console.log(result);
        setUserData(result);
      })
      .catch((error) => console.log('error', error));
  }, []);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  return (
    <TableLayout>
      {userData ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table" size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">이름</StyledTableCell>
                <StyledTableCell align="center">학번</StyledTableCell>
                <StyledTableCell align="center">이메일</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow key={userData.userId}>
                <StyledTableCell align="center">{userData.name}</StyledTableCell>
                <StyledTableCell align="center">{userData.studentNumber}</StyledTableCell>
                <StyledTableCell align="center">{userData.email}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">학기수</StyledTableCell>
                <StyledTableCell align="center">전공</StyledTableCell>
                <StyledTableCell align="center">연락처 뒷자리</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="center">{userData.semester}</StyledTableCell>
                <StyledTableCell align="center">{userData.majorName}</StyledTableCell>
                <StyledTableCell align="center">{userData.phone}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
      <h6 className="text-muted">
        <small>
          <br></br>*개인정보수정 필요시 관리자에게 문의하세요.
        </small>
      </h6>
    </TableLayout>
  );
}