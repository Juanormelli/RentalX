# Cadastro de carro #
**RF**
Deve ser possivel cadastrar um novo carro.
Deve ser possivel listar todas as categorias 


**RN**
Nao deve ser possivel cadastrar o carro com uma placa ja existente. 
Não deve ser possivel alterar a placa de um carro cadastrado
O carro deve ser cadastrado como disponivel para aluguel por padrao.
Nao deve ser possivel cadastrar um carro se nao for Administrador

# Listagem de carros

**RF**
Deve ser possivel listar os carros disponiveis.
Deve ser possivel listar todos os carros disponiveis pelo nome da categoria
Deve ser possivel listar todos os carros disponiveis pelo nome da Marca 
Deve ser possivel listar todos os carros disponiveis pelo nome do carro

**RN**
O usuario nao precisa estar logado no sistema


# Cadastro de especificação no carro

**RF**
Deve ser possivel cadastrar uma nova especificação para o carro
Deve ser possivel listar todas as especificações
Deve ser possivel listar todos os carros 

**RN**
Nao deve ser possivel cadastrar uma especificação para um carro inexistente
Nao deve ser possivel cadastrar uma especificação para um carro que ja possua ela 
Nao deve ser possivel cadastrar uma especificação se nao for Administrador

# Cadastro de imagens do carros

**RF**
Deve ser possivel cadastrar a imagem do carro
Deve ser possivel listar todos os carro 

**RNF**
Utilizar Multer para Upload de imagens 

**RN**
O usuario pode cadastrar mais de uma imagem por carro
Nao deve ser possivel cadastrar uma imagem se nao for Administrador


# Aluguel de carros
**RF**
Deve ser possivel cdatsrar um Aluguel


**RN**
O aluguel deve ter duração minima de 24 horas
Nao deve ser possivel cadastrar um novo aluguel caso exista um novo aberto para o mesmo usuario
Nao deve ser possivel cadastrar um novo aluguel caso exista um novo aberto para o mesmo carro