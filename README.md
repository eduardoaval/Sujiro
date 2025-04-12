# ProjetoWeb
Para o primeiro release do projeto de um site de reviews de mídias (filmes, jogos e livros) foram definidas primeiramente cinco telas utilizando HTML5 e CSS sem precisar da implementação das funcionalidades pelo javascript, como assim especificado na tarefa. Ademais, para cada tela foi feito um modo alternativo para pessoas com baixa visão via CSS, utilizando um fundo preto que vai ser mostrado posteriormente. Ademais, foi pedido a checagem de tudo que foi feito por um validador, no qual iria detectar possíveis erros para a equipe corrigir.

Para início, organizamos uma reunião via google meet com todos os integrantes para discutir o que iríamos incluir neste release. Primeiramente o Eduardo mostrou um código base para rodar o website e posteriormente fomos decidir um tema possivelmente temporário de cor para ambos tipos de tela, foi proposto pelo Rommel o uso de um azul de tonalidade média com pouca saturação, pois o mesmo ficaria destacado o suficiente em um fundo branco sem ser forte nos olhos tanto quanto o fundo branco, e ficaria bem visível em um fundo mais escuro sem ser forte nos olhos e dificultar a leitura. Após apresentado essa ideia de cor Clailton aprensentou uma proposta para o modo alternativo (baixa visão) onde o fundo era totalmente preto e havia a utilização de um amarelo que destacaria o texto escrito, após discutimos ambas as ideias foi decidido manter a cor azul para o modo claro e escuro de telas, e também foi feito o modo alternativo para acessibilidade seguindo pesquisas feitas sobre o mesmo.

Posteriormente foi analisado que telas poderiam ser feitas primeiramente, Glasser e Clailton propuseram mostrar as telas de login, tela principal e tela do administrador, detalhando as funções das mesmas, conforme fomos discutindo Eduardo e Rommel propuseram mais duas telas, a de detalhes dos usuários e a de detalhe dos filmes e assim no final foi dividido e acordado por todos que Eduardo e Rommel ficariam com as tela principal e a de detalhes dos filmes, Clailton ficaria com a tela de usuário e Glasser com a tela de login e a tela do administrador. Para auxiliar nas atividades fomos atrás de vídeos do youtube e do site W3 schools.

Assim, as telas escolhidas para serem mostradas primeiramente nesse release foram as seguintes: 
Página inicial: corresponde a primeira página que o visitante frequenta ao entrar no site, onde contém uma barra de menu no topo com as categorias das mídias, uma barra de pesquisa e um botão para log in e cadastro de um usuário; e também contém na página principal amostras de novos lançamentos, mídias em alta no site em sí e críticas mais recentes.  
 
  
Página detalhes do filme: corresponde a página que o visitante frequenta ao selecionar um filme; ela contém, além da barra de menu do topo descrita anteriormente, a imagem do filme, nome, data de lançamento, descrição, imagens extras, diretor, sinopse, categoria do filme, elenco, avaliação dos usuários, nota agregada no site e curiosidades sobre o filme.
      
Página detalhes dos usuários: corresponde a página que o visitante pode ver o perfil de outros usuários e contém as mídias assistidas/lidas/jogadas, reviews e notas e um botão para a virar seguidor/amigo.
 
 
    
Tela de login: corresponde a página para o usuário fazer login com o username e senha respectivos, assim como um botão para cadastro.
   
Tela do administrador: corresponde a um formulário para adicionar novos conteúdos nas telas do site.
   
Por fim, após feitas todas as telas foram passados todos os códigos HTML e CSS no validador pedidos pelo professor, apesar de terem sido detectado alguns erros os mesmos foram corrigidos rapidamente e após uma segunda passagem pelo validador ele não detectou mais erros.

Para o segundo release do projeto de um site de reviews de mídias (filmes, jogos e livros) foram divididas as atividades do release para cada membro através de uma reunião via google meet, onde Eduardo e Rommel foram responsáveis pelos itens A (Gerar dinamicamente as diferentes seções do documento HTML a partir de dados
armazenados no servidor, considerando usuários e/ou perfis distintos.), B (Organizar os seus dados de tal maneira que um mesmo template possa ser usado para
diferentes usuários e/ou situações. Os templates podem ser definidos usando o EJS,
conforme exemplos fornecidos, ou usar módulos semelhantes a partir do NodeJS.) e C (A carga de conteúdo deve contemplar tanto requisições HTTP síncronas, a partir de
formulários e hiperlinks, como assíncronas, a partir de JS CLIENTE). Clailton e Glasser ficaram com o item D (Implemente, nesta versão, a alternância entre os arquivos CSS definidos no release 1 por
meio de solução interativa.) e E (Como recurso de acessibilidade adicional, implemente também o ajuste de tamanho das
fontes por meio de botões (A+ e A-), cuja última configuração deve ser armazenada no
cliente juntamente ao último CSS definido.)

Para começo, foi definido como seria a organização das primeiras tabelas que iriam constar no banco de dados, assim foi feita a tabela de mídias, usuários e reviews, onde cada uma tem ligação com a outra de diferentes formas. A de usuários tem um link com a de mídias pois eles podem marcar aquelas que eles já degustaram, assim como fazer reviews, o que também mostra o link que a tabela de reviews tem pela de mídias e usuário. Após isso foi utilizado a API do IMDB para popular nosso banco de dados com alguns filmes, a fim de posteriormente utilizar esses dados do banco para popular nosso site, e assim foi feita a criação de cada página de cada filme, a página de lista de filmes e também a ordenação dos filmes na página principal (categorias em alta e últimos lançamentos). Também foi possível vincular reviews para serem mostradas na página inicial pelo filtro de data e também na página de algum filme em específico. Vale ressaltar que foi utilizado também o sequelize para auxiliar nas atividades dos itens A, B e C.

Nova barra de menu:
Para a inclusão das funcionalidades de troca do design para alto contraste e alteração no tamanho da fonte, visando maior acessibilidade, foi criada uma nova barra de menu. Essa nova versão conta com os mesmos campos da anterior, como botões que levam a outras páginas e a barra de busca. Como novidade, foram inseridos os botões que realizam as funções anteriormente citadas e, visando facilitar o acesso do usuário às mesmas, a barra agora é fixa no topo da tela, permitindo que o acesso a seus botões seja feito em qualquer ponto da página, sem precisar retornar ao início.
Página detalhes do filme: corresponde a página que o visitante frequenta ao selecionar um filme; ela contém, além da barra de menu do topo descrita anteriormente, a imagem do filme, nome, data de lançamento, descrição, imagens extras, diretor, sinopse, categoria do filme, elenco, avaliação dos usuários, nota agregada no site e curiosidades sobre o filme.

Alteração de tamanho da fonte:
Foram adicionados dois botões; um é responsável por aumentar a fonte, enquanto outro diminui. Event listeners foram criados para monitorar cliques sobre esses botões. A lógica é a seguinte: o tamanho de fonte atual é capturado e uma comparação é feita: para aumentar, o tamanho atual deve ser menor que 20 e para diminuir deve ser maior que 14. Esse passo é realizado para evitar indefinição nos limites de tamanho. Passando por esse filtro, o tamanho é alterado em duas unidades, para maior ou menor. O valor padrão é 16, que é definido anteriormente.

A mudança no contraste é feita através do código Js no lado cliente e as preferencia do usuario é armazenado no LocalStorage. Assim quando o usuario carregar  a pagina tem uma função responsavel por pegar as preferencias guardadas e configurar de acordo com as escolhas anteriore.
As preferencias são variavéis do tipo strings cujo os valores serão adicionados ou removidos da classList dos elementos HTML da página.


IMAGENS EXEMPLO RELEASE 1
![image](https://user-images.githubusercontent.com/95040008/143489709-bb67377f-71f5-46b1-8199-d08847a0441a.png)
![image](https://user-images.githubusercontent.com/95040008/143489726-cab7b0c4-a299-42cd-8839-3bf1e38e8075.png)
![image](https://user-images.githubusercontent.com/95040008/143489740-3fa08505-c192-43b6-bd28-4cbed979b31c.png)
![image](https://user-images.githubusercontent.com/95040008/143489761-e57a1a22-417b-449a-ad13-cdb0ad118d72.png)
![image](https://user-images.githubusercontent.com/95040008/143489770-49344881-8d4e-41e0-b491-2779d5e5287f.png)
![image](https://user-images.githubusercontent.com/95040008/143489778-b42ebbe7-dd2d-4abe-b3df-1c33f41cdec9.png)
![image](https://user-images.githubusercontent.com/95040008/143497141-4304d95a-d131-480e-819a-043a28c53062.png)
![image](https://user-images.githubusercontent.com/95040008/143497157-1f9bafb3-8bad-4c2f-9377-6a175473d6e3.png)
![image](https://user-images.githubusercontent.com/95040008/143497167-22d9f573-b589-492f-8be6-a8eeaa85698c.png)
![image](https://user-images.githubusercontent.com/95040008/143497175-cff59582-c2c3-4ad9-abff-4fd31d57d49f.png)
![image](https://user-images.githubusercontent.com/95040008/143497178-1dbf332d-90b3-457a-a82d-1f5fe469c96e.png)
![image](https://user-images.githubusercontent.com/95040008/143497185-574465e3-71b2-484b-a196-4a05b32a8127.png)



