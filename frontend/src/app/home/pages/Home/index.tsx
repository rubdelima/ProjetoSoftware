import Navbar from '../../components/Navbar';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Home.css"
const Home = () => {

  const navigate = useNavigate();
  const [chamados, setChamados] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [chamadoAtual, setChamadoAtual] = useState(null);

  const handleOpenPopup = (chamado_dict) => {
    setChamadoAtual(chamado_dict);
    setOpenPopup(true);
  };
  
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleSendResponse = () => {
    const postData = {
      rq: chamadoAtual,
      msg: responseText,
    };
    console.log(postData);
    axios.post('http://localhost:8000/requirements/messages/', postData);
    setOpenPopup(false);

  };

  const solveProblem = (chamado) => {
    axios.post('http://localhost:8000/requirements/messages/', chamado);
  };
  

  useEffect(() => {
    const linkget = localStorage.userType === "adm" ? `` : `${localStorage.tokenAccess}`;
    axios.get(`http://localhost:8000/requirements/${linkget}`)
      .then(response => {
        setChamados(response.data.list_of_requirements);
      })
      .catch(error => {
        console.error('Erro ao obter a lista de chamados:', error);
      });
  }, []);

    useEffect(() => {
      if (!(localStorage.tokenAccess)) {
        navigate('/login');
      }
    }, []);

    function getStatusColor(status) {
      if (status === 'não respondida') {
        return '#ffbac3';
      } else if (status === 'respondida') {
        return '#ffffd5';
      } else if (status === 'finalizada') {
        return '#dae9d0';
      }
      return 'white';
    }

  return (
    <>
    <Navbar navTitle={"HELPDESK"}></Navbar>
    <div className='list-content'>
      <h1>Lista de Chamados</h1>
      <div className='chamados'>
        {chamados.length > 0 && chamados?.map((chamado) => {
          return (
            <div className='chamado-row'
            style={{backgroundColor: getStatusColor(chamado.status)}}>
              <div className='chamado-title'>
                <h2>{chamado.title}</h2>
              </div>
              <div>
                <p>Status: {chamado.status}</p>
                <p>Tipo: {chamado.tipo}</p>
                <p>Setor: {chamado.setor}</p>
              </div>
              <ul>
              {chamado.messages.map((mensagem) => (
                <li
                key={mensagem.id}
                style={{ backgroundColor: getStatusColor(chamado.status) }}
                >
                <p>Emissor ID: {mensagem.emissor_id}</p>
                <p>Data: {mensagem.data}</p>
                <p>Mensagem: {mensagem.message}</p>
              </li>
            ))}
              </ul>
              <Button 
              size="large"
              variant="text"
              onClick={() => solveProblem(chamado)}
              sx={{
                color: '',
                borderColor: 'white',
                width: '120px',
                marginLeft: '75px'
                }}
                >Responder</Button>
                {localStorage.userType === "adm" && (
                  <Button 
                  size="large"
                  variant="text"
                  onClick={() => handleOpenPopup(chamado)}
                  sx={{
                    color: '',
                    borderColor: 'white',
                    width: '120px',
                    marginLeft: '75px'
                    }}
                    >Fechar</Button>
                )}
            </div>
          );
        })}
      </div>
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>Responder</DialogTitle>
        <DialogContent>
          <TextField
            label="Digite sua resposta"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
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
    </div>
    </>
  );

};

export default Home;