# FORTECode 🛡️

**Projeto de Iniciação Científica - FATEF**

> **Repositório do Projeto:** [https://github.com/adriel007/fortecode-plugin](https://github.com/adriel007/fortecode-plugin)

**FORTECode** é uma extensão para Visual Studio Code desenvolvida como parte de um projeto de Iniciação Científica da FATEF. O objetivo central desta pesquisa é explorar métodos de proteção de software proprietário no desenvolvimento web, especificamente contra plágio e engenharia reversa casual.

## O Problema

Softwares distribuídos, especialmente para a web, expõem seu código-fonte *client-side* (JavaScript, CSS, HTML). Esse código pode ser facilmente copiado, modificado e redistribuído sem autorização, levando a plágio e pirataria. Embora a proteção total no *client-side* seja impossível, é viável criar barreiras significativas.

## Nossa Solução

O FORTECode atua como uma ferramenta de **segurança por obscuridade (security through obscurity)**. Ele se integra diretamente ao VSCode para permitir que o desenvolvedor, com um simples clique, transforme seu código legível em uma versão "embaralhada" (ofuscada) ou compactada (minificada).

Isso dificulta drasticamente a análise e o reuso por terceiros, protegendo a propriedade intelectual investida no software.

## Funcionalidades

A extensão permite selecionar um trecho de código e processá-lo instantaneamente:

* **Minificar Seleção:** Remove espaços em branco, quebras de linha e comentários de:
    * `JavaScript`
    * `CSS`
    * `HTML`
* **Ofuscar Seleção:** Reescreve ativamente o código `JavaScript` (a linguagem de lógica principal) para torná-lo funcionalmente idêntico, mas logicamente indecifrável para um humano. Isso inclui:
    * Renomear variáveis e funções (`a`, `b`, `_0x...`).
    * Mover strings para um array central (`stringArray`).
    * Injetar código morto.
    * Achatar o fluxo de controle.
* **Configurável:** Permite ao usuário ajustar o nível de ofuscação (ex: desativar `console.log`, ativar proteção anti-debug) através das configurações nativas do VSCode.

## Metodologia e Tecnologias

Este plugin atua como um *wrapper* (ponte) para ferramentas robustas e testadas pela indústria, integrando-as à API do VSCode:

* **Plataforma:** API do VSCode (TypeScript)
* **Minificação/Ofuscação de JS:** [Terser](https://github.com/terser/terser) & [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator)
* **Minificação de CSS:** [clean-css](https://github.com/clean-css/clean-css)
* **Minificação de HTML:** [html-minifier-terser](https://github.com/terser/html-minifier-terser)

## Instalação e Teste (Via .vsix)

Como este plugin é um protótipo de pesquisa, ele não está na Marketplace oficial. Para testá-lo:

1.  Vá para a seção [**Releases**](https://github.com/adriel007/fortecode-plugin/releases) do nosso repositório GitHub.
2.  Baixe o arquivo `.vsix` mais recente (ex: `fortecode-0.1.0.vsix`).
3.  No seu VSCode, vá até a aba de **Extensões** (Ctrl+Shift+X).
4.  Clique nos três pontinhos (`...`) no canto superior do painel e selecione **"Instalar do VSIX..."**.
5.  Escolha o arquivo `.vsix` que você baixou.
6.  Reinicie o VSCode quando solicitado.

### Utilização

1.  Abra um arquivo (`.js`, `.css`, `.html`).
2.  **Selecione** o trecho de código que deseja processar.
3.  **Clique com o botão direito** na seleção.
4.  Escolha a opção desejada:
    * `FORTECode: Minificar Seleção`
    * `FORTECode: Ofuscar Seleção (JavaScript)`

## 👨‍💻 Autores

Este projeto foi concebido e desenvolvido por:

* **Adriel Domingues de Souza Andrade**
    * [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/adriel-domingues-de-souza-andrade/)
* **Luiz Felipe Moura Batista**
    * [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/luiz-felipe-m-a9b843227/)

## ⚠️ Disclaimer de Pesquisa

É crucial para este trabalho científico entender que **ofuscação não é criptografia**. A segurança por obscuridade é um **deterrente**, não uma barreira intransponível. Um ator malicioso com tempo e conhecimento suficientes *pode* reverter o código. A proteção real de lógicas de negócio críticas deve sempre ser implementada no **back-end (servidor)**.

## 📄 Licença

Distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.