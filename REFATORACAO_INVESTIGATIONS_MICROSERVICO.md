# Refatoração: InvestigationsModule para Microserviço

## Objetivo

Separar a parte de investigações em um microserviço dedicado, mantendo a API HTTP principal funcionando como gateway para as operações de investigação.

## O que mudou

1. A aplicação principal deixou de usar o módulo local de investigações diretamente e passou a usar um gateway:
   - [src/app.module.ts](src/app.module.ts)

2. O controller HTTP de investigações passou a encaminhar chamadas para o microserviço via TCP:
   - [src/modules/investigations/investigation.controller.ts](src/modules/investigations/investigation.controller.ts)

3. Foi criado um client service para comunicação com o microserviço, com timeout e tradução de erros para HTTP:
   - [src/modules/investigations/investigation.client.service.ts](src/modules/investigations/investigation.client.service.ts)

4. Foi criado o módulo gateway que registra o ClientProxy TCP para investigações:
   - [src/modules/investigations/investigations-gateway.module.ts](src/modules/investigations/investigations-gateway.module.ts)

5. Foi criado um controller de microserviço com MessagePattern para as operações de listar, buscar e fechar investigação:
   - [src/modules/investigations/investigation.microservice.controller.ts](src/modules/investigations/investigation.microservice.controller.ts)

6. O módulo de investigações foi ajustado para expor o controller de mensagens do microserviço:
   - [src/modules/investigations/investigations.module.ts](src/modules/investigations/investigations.module.ts)

7. Foi criado um módulo raiz dedicado ao processo de microserviço:
   - [src/investigations-microservice.module.ts](src/investigations-microservice.module.ts)

8. Foi criado um entrypoint exclusivo para subir o microserviço de investigações (TCP em 127.0.0.1:4001):
   - [src/main-investigations.ts](src/main-investigations.ts)

9. Foram adicionados scripts e dependência para microservices:
   - [package.json](package.json)
   - [package-lock.json](package-lock.json)

## Fluxo da nova arquitetura

1. Cliente chama endpoint HTTP de investigações na API principal.
2. Controller HTTP encaminha para o InvestigationClientService.
3. ClientProxy envia mensagem TCP para o microserviço de investigações.
4. InvestigationMicroserviceController processa a mensagem.
5. InvestigationService executa regra de negócio e retorna o resultado.
6. Gateway retorna resposta HTTP no formato já utilizado pela API.

## Comentários adicionados no código

Foram adicionados comentários curtos e objetivos para facilitar entendimento dos pontos principais da refatoração:

1. Fronteira HTTP para microserviço:
   - [src/modules/investigations/investigation.controller.ts](src/modules/investigations/investigation.controller.ts#L13)

2. Mapeamento de erro de transporte para erro HTTP:
   - [src/modules/investigations/investigation.client.service.ts](src/modules/investigations/investigation.client.service.ts#L42)

3. Papel do módulo dedicado do microserviço:
   - [src/investigations-microservice.module.ts](src/investigations-microservice.module.ts#L5)

4. Inicialização do processo dedicado:
   - [src/main-investigations.ts](src/main-investigations.ts#L18)

## Como executar

1. Subir o microserviço de investigações:
   - npm run start:investigations:dev

2. Subir a API principal:
   - npm run start:dev

## Resultado

A parte de investigações foi isolada em um processo próprio de microserviço, mantendo compatibilidade com os endpoints HTTP já existentes e preparando o projeto para evolução incremental em direção a arquitetura distribuída.