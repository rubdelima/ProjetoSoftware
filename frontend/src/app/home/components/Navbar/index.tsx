import { AppBar, Box, Toolbar, Typography,  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Navbar({ navTitle }) {

  const [openPopup, setOpenPopup] = useState(false);
  const [titleText, setTitleText] = useState('');
  const [messageText, setMessageText] = useState('');

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };
  
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleSendResponse = () => {
    const postData = {
      student_id : localStorage.tokenAccess,
      title : titleText,
      tipo : 'problema',
      message : messageText,
    };
    axios.post('http://localhost:8000/requirements/', postData);
    setOpenPopup(false);

  };

  let navigate = useNavigate();

  const logOut = () => {
    delete localStorage.tokenAccess;
    navigate('/login');
  }

  return(
    <Container>
    <Box sx={{ flexGrow: 1, position: "absolute", width: "100vw", left: 0 }}>
      <AppBar position="static" sx={{ backgroundColor: '#dd0202'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "Segoe UI" }}>
            {navTitle}
          </Typography>
          {localStorage.userType === "student" && (<Button
            size="large"
            variant="text"
            onClick={() => handleOpenPopup()}
            sx={{
              color: 'white',
              borderColor: 'white',
              width: '120px',
              marginRight: '10px'
              }}
          >
            Abrir Chamado
          </Button>)}
          <Button
            data-cy="criar conta"
            size="large"
            variant="outlined"
            sx={{ color: 'white', borderColor: 'white' }}
            onClick={() => logOut()}
          >
            SAIR
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>Titulo</DialogTitle>
        <DialogContent>
          <TextField
            label="Digite o titulo"
            variant="outlined"
            fullWidth
            multiline
            rows={1}
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
          />
        </DialogContent>
        <DialogTitle>Mensagem</DialogTitle>
        <DialogContent>
          <TextField
            label="Digite o titulo"
            variant="outlined"
            fullWidth
            multiline
            rows={10}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Fechar
          </Button>
          <Button onClick={handleSendResponse} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
