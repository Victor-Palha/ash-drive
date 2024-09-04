# Ash Drive
Este projeto é uma necessidade que surgiu para mim quando me vi em uma situação onde eu precisava transferir arquivos grandes entre meu Desktop *Windows* e meu Notebook *Mac*. Eu não queria usar um HD, pois eu não queria ter que ficar carregando um HD comigo, e eu não queria usar um serviço de nuvem, pois eu não queria ter que esperar o upload e download de arquivos grandes. Eu queria algo rápido e prático, e foi assim que surgiu o **Ash Drive**.

O **Ash Drive** é um servidor de arquivos que você pode rodar em sua máquina e acessar de qualquer dispositivo que esteja na mesma rede. Ele é simples e fácil de usar, e você pode acessar seus arquivos de qualquer dispositivo que tenha um navegador web.

## Instalação
Para instalar o **Ash Drive** você precisa ter o [Node.js](https://nodejs.org/) instalado em sua máquina. Com o Node.js instalado, você pode instalar o sistema com os seguinte passos:
1. Clone o repositório
2. Entre na pasta do projeto e acesse a API
```bash
cd ash-drive
cd api
npm install
npm run dev
```
3. Agora que a API está rodando, verifique o endereço que ela está rodando e acesse o arquivo `drive-front/src/lib/axios.ts` e altere o valor da variável `baseURL` para o endereço da API
4. Abra um novo terminal e acesse o Frontend
```bash
cd ash-drive
cd drive-front
npm install
npm run dev
```
5. Acesse o endereço `http://localhost:3000` em seu navegador

## Build
O projeto não utiliza build, pois ele é executado em modo de desenvolvimento. Se você deseja fazer um build do projeto, você pode fazer isso com o comando `npm run build` na pasta `drive-front` e depois executar o comando `npm run preview`.