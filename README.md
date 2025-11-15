🐶 Meu Pet Vacinado — Aplicativo de Controle de Vacinas de Pets Aplicativo desenvolvido em React Native (Expo Router) para auxiliar tutores no controle de vacinas dos seus pets, permitindo cadastrar animais, registrar vacinas, editar informações e acompanhar o histórico de imunizações.
Este projeto foi desenvolvido como trabalho final da disciplina de Webservices e MBaaS, utilizando conceitos práticos de:
* Autenticação
* CRUD completo (Pets e Vacinas)
* Armazenamento em nuvem com Firebase
* Navegação com Expo Router
* Boas práticas com hooks, estados e validações
🚀 Tecnologias Utilizadas
* React Native (Expo)
* Expo Router
* TypeScript
* Firebase Authentication
* Firestore Database
* Expo ImagePicker
* Styled Components / StyleSheet


📱 Funcionalidades do App 👤 Autenticação
* Cadastro de usuário (Firebase Auth)
* Login com email/senha
* Manutenção automática do estado logado

  
🐕 Módulo de Pets
* Listar todos os pets cadastrados pelo usuário
* Criar novo pet
* Editar nome, raça e foto do pet
* Atualização automática ao voltar de qualquer tela

  
💉 Módulo de Vacinas
* Adicionar vacinas por pet
* Editar vacina já cadastrada

  
Campos utilizados:
* Nome da vacina
* Data de aplicação
* Próxima dose
* Observação
  
Vacinas vinculadas diretamente ao pet
* Lista sempre atualizada ao retornar para a tela anterior

  
🔄 Sincronização em Tempo Real
* Todos os dados são armazenados no Firestore e recuperados dinamicamente
* Cada usuário vê apenas seus próprios pets e vacinas
  (estruturados em /users/{uid}/pets/{petId}/vaccines/{vaccineId})

📦 Instalação e Execução

1️⃣ Clonar o repositório

  * git clone https://github.com/SEU-USUARIO/meu-pet-vacinado.git cd meu-pet-vacinado
    
2️⃣ Instalar dependências

  npm install
  
3️⃣ Iniciar o projeto

  npx expo start
  
4️⃣ Executar no celular

  Baixe o Expo Go Escaneie o QR Code O app abre automaticamente

🔥 Configuração do Firebase 
  * Crie o arquivo: /services/firebase/firebaseConfig.ts Com:
  
  export const firebaseConfig =
 
  {
  
    apiKey: "AIzaSyC9_nPimuwZ1iRWayuiAZ7lWFJMCLwPSnI",
    
    authDomain: "meupetvacinado-3d96f.firebaseapp.com",
    
    projectId: "meupetvacinado-3d96f",
    
    storageBucket: "meupetvacinado-3d96f.firebasestorage.app",
    
    messagingSenderId: "673340502361",
    
    appId: "1:673340502361:web:0216ccb7eabf2af84b1c48"
    
  };
  
  Estrutura no Firestore:
  users 
  
  └── {uid} 
    └── pets 
      └── {petId} 
        └── vaccines 
          └── {vaccineId}


🧠 Conceitos trabalhados no projeto
* Ciclo de vida com useEffect e useFocusEffect
* Navegação dinâmica com expo-router
* Parametrização de rotas (/pets/[id])
* Estados controlados
* Formulários com validação
* Date masks
* Comunicação com serviços externos (Firebase)
* Organização em camadas (services / screens / styles)

  
📝 Possíveis Melhorias Futuras
* Editar foto da vacina
* Notificações push próximas vacinas
* Dashboard com estatísticas
* Múltiplos tutores por pet
* Multi-plataforma Web
  
👨‍💻 Desenvolvedor Felipe Ribeiro

📄 Licença Livre para fins acadêmicos.
