# Recuperação de senha

**_ Requesitos Funcionais _**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**_ Requesitos Não Funcionais _**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios de produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**_ Regras de Negócio _**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**_ Requesitos Funcionais _**

- O usuário deve poder atualizar seu nome, e-mail e senha;

**_ Regras de Negócio _**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualzar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**_ Requesitos Funcionais _**

- O usuário deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber um notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**_ Requesitos Não Funcionais _**

- Os agendamentos do prestador no dia devem ser armazanados em cache;
- As notificações do prestador devem ser armazanadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**_ Regras de Negócio _**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**_ Requesitos Funcionais _**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
  -O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
  -O O usuário deve poder listar horários disponíveis em um dia especifíco de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**_ Requesitos Não Funcionais _**

- A listagem de prestadores deve ser armazenada em cache;

**_ Regras de Negócio _**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário nãp pode agendar serviços consigo mesmo;
