# Helpdesk Chamados
O projeto infelizmente nao foi feito com Node no Backend (apenas da databas com o Json Server), e como dito o banco de dados nao foi feito com SQL

As dependencias do node para rodar, na pasta fontentd, use:
`nmp install`
Para rodar o json server, na pasta principal, use:
`npm install -g json-server`
As dependencias do backend é python e o Uvicorn, use:
`pip install uvicorn`
`pip install fastapi`

Para rodar a aplicacao abra 3 terminais
o primeiro na na pasta principal, a db, use:
`json-server -p 4000 -w .\backend\src\db\db.json`
para o backend entre em backend e ponha:
`python3 -m uvicorn src.main:app --reload`
para o frontend entre em frontend e ponha:
`nmp run dev`