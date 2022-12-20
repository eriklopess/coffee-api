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

## Documentação

*Rotas com a marcação `!!` necessitam de login para ser acessadas.*
*Rotas com a marcação `§§` necessitam de login de um administrador para ser acessadas.*

### USER

#### POST /user
|Propriedade|Tipo|Requirido| Default |
|--|--|--|--|
|name|string|sim|
|email|string|sim|
|password|string|sim|
|role|string|não|user|

*Será retornado apenas as propriedades _id, name e email.*

### POST /user/login

|Propriedade|Tipo|Requirido
|--|--|--|
|email|string|sim|
|password|string|sim|

*Será retornado as propriedades name, email, role e token.*

#### GET /user/:id

|Propriedade|Tipo
|--|--|
|_id|string|
|name|string|
|email|string|
|role|string|

#### §§ DELETE /user/:id

##### Não retorna corpo!

#### !! PUT /user/:id

|Propriedade|Tipo|Requirido
|--|--|--|
|name|string|não|
|email|string|não|
|password|string|não|
|role|string|não


### PRODUCTS

#### GET  /product
**Array**
|Propriedade|Tipo
|--|--|
|_id|string|
|name|string|
|description|string|
|price|number|
|stock|number|

#### GET /product/:id
|Propriedade|Tipo
|--|--|
|_id|string|
|name|string|
|description|string|
|price|number|
|stock|number|

#### §§ POST /product

|Propriedade|Tipo|Requirido
|--|--|--|
|name|string|sim|
|price|number|sim|
|stock|number|sim|
|description|string|sim

*Retorna as mesmas propriedades*

#### §§ PUT /product/:id
|Propriedade|Tipo|Requirido
|--|--|--|
|_id|string|não
|name|string|não
|description|string|não
|price|number|não
|stock|number|não

#### §§ DELETE /product/:id
##### Não retorna corpo!

### !! COUPOM

#### GET /coupom

|Propriedade|Tipo
|--|--|
|_id|string
|code|string
|status|boolean
|expires|object
|discount| object
|usages|number

```js
expires: {
	type: enum['date', 'quantity', 'infinity'],
	value: Date | number
}

discount: {
	type: enum['percentage', 'amount'],
	value: number
```
#### GET /coupom/:id

|Propriedade|Tipo
|--|--|
|_id|string
|code|string
|status|boolean
|expires|object
|discount| object
|usages|number

```js
expires: {
	type: enum['date', 'quantity', 'infinity'],
	value: Date | number
}

discount: {
	type: enum['percentage', 'amount'],
	value: number
```
#### §§ POST /coupom

|Propriedade|Tipo | Requirido | Default
|--|--|--|--|
|code|string|sim
|status|boolean|não|true
|expires|object|não| infinity
|discount| object|sim
|usages|number|não| 0

```js
expires: {
	type: enum['date', 'quantity', 'infinity'],
	value: Date | number
}

discount: {
	type: enum['percentage', 'amount'],
	value: number
```

#### §§ PUT/coupom/:id

|Propriedade|Tipo 
|--|--|
|code|string|
|status|boolean|
|expires|object|
|discount| object|
|usages|number|não|

```js
expires: {
	type: enum['date', 'quantity', 'infinity'],
	value: Date | number
}

discount: {
	type: enum['percentage', 'amount'],
	value: number
```

#### §§ DELETE/coupom/:id
##### Não retorna corpo!

### Order

#### GET /order

**Array**
|Propriedade|Tipo 
|--|--|
|_id|string|
|items|product[]|
|user|string - user id|
|payment| object|
|createdAt| date|

```js
payment: {
	type: enum['credit', 'debit', 'pix'],
	status: enum['pending', 'paid', 'refunded', 'cancelled'],
	coupom?: string - coupom code,
	total: number,
	finalPrice: number
}
```

#### GET /order/:id

|Propriedade|Tipo 
|--|--|
|_id|string|
|items|product[]|
|user|string - user id|
|payment| object|
|createdAt| date|

```js
payment: {
	type: enum['credit', 'debit', 'pix'],
	card?: {
		number: string
	} ,
	status: enum['pending', 'paid', 'refunded', 'cancelled'],
	coupom?: string - coupom code,
	total: number,
	finalPrice: number
}
```

#### §§ POST /order
|Propriedade|Tipo| Requirido | Default
|--|--|--|--|
|items|product[]| sim|
|user|string - user id | não | id do usuário|
|payment| object | sim |
|createdAt| date | não | new Date()|

```js
payment: {
	type: enum['credit', 'debit', 'pix'],
	// Caso for for credit ou debit necessitará de adicionar o cartão
	// Caso for pix, não precisa adicionar o cartão
	card?: {
		number: string,
		name: string,
		expiration: string, //ex: 12/25
		cvv: string
	} ,
	status: enum['pending', 'paid', 'refunded', 'cancelled'],
	coupom?: string - coupom code,
	total: number,
	finalPrice: number
}
```
#### §§ PUT /order/:id
|Propriedade|Tipo
|--|--|
|items|product[]|
|user|string - user id |
|payment|object|
|createdAt|date|

```js
payment: {
	type: enum['credit', 'debit', 'pix'],
	// Caso for for credit ou debit necessitará de adicionar o cartão
	// Caso for pix, não precisa adicionar o cartão
	card?: {
		number: string,
		name: string,
		expiration: string, //ex: 12/25
		cvv: string
	} ,
	status: enum['pending', 'paid', 'refunded', 'cancelled'],
	coupom?: string - coupom code,
	total: number,
	finalPrice: number
}
```
