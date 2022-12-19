# Coffee App API

Seja bem-vindo(a) ao meu projeto, criei essa API para fins estudantis, o objetivo era desenvolver um sistema de API com as tecnologias Node, Express, MongoDB para exercitar meu conhecimento, e também utilizar técnicas de segurança para aprender a evitar invasões em minhas aplicações.

## Como instalar em sua máquina

### Clonar o repositório.

Em seu primeiro passo você irá precisar utilizar o git para clonar este repositório. 

`git clone git@github.com:eriklopess/coffee-api.git`

### Instalar dependências.

Nessa segunda etapa você precisará abrir a pasta já clonada em seu terminal e digitar o seguinte comando.

`npm install`

### Adicionar variáveis de ambiente.

O terceiro passo é muito simples, você precisará criar um arquivo chamado `.env`e adicionar as seguintes variáveis.

MONGO_URI
*Esta variável será o link de conexão com sua base de dados mongo.*
JWT_SECRET
*Esta variável será o código secret dos tokens jwt, ou seja, a assinatura dos mesmos.*
JWT_EXPIRES_IN
*Será o tempo que os tokens jwt da aplicação levaram para expirar, ex: 1d.*
SECRET_KEY
*Outro secret key, mas dessa vez é para a criptografia de senhas e tokens da aplicação.*

### Iniciar a aplicação.

Bom agora só iniciar a aplicação e testar as rotas que estão documentadas logo abaixo.