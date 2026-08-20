# Requisitos e Escopo — Terê Verde Online

Situação-problema: **Circuito Terê Verde** (MVP Mobile Development).

## Atores

- **Visitante** — qualquer pessoa que acesse o site, sem necessidade de
  cadastro, em busca de informações sobre trilhas, cachoeiras,
  biodiversidade e eventos das unidades de conservação de Teresópolis.
- **Administrador** — usuário autenticado responsável por manter o
  conteúdo do site atualizado.

## Requisitos Funcionais

| ID | Descrição |
|----|-----------|
| RF01 | O sistema deve listar as unidades de conservação (PARNASO, Três Picos e Montanhas de Teresópolis) com nome, tipo e descrição. |
| RF02 | O sistema deve listar as trilhas disponíveis, com dificuldade, distância, duração média, ganho de altitude e status de disponibilidade. |
| RF03 | O sistema deve exibir uma página de detalhe para cada trilha. |
| RF04 | O sistema deve listar as cachoeiras, com altura, forma de acesso e status de disponibilidade, e exibir uma página de detalhe para cada uma. |
| RF05 | O sistema deve listar espécies de fauna e flora (biodiversidade) associadas às unidades de conservação. |
| RF06 | O sistema deve listar eventos e temporadas, com tipo, período, horário de funcionamento e status. |
| RF07 | O sistema deve exibir um botão de login visível para acesso da área administrativa. |
| RF08 | O administrador deve poder autenticar-se com e-mail e senha. |
| RF09 | Rotas administrativas devem ser inacessíveis a usuários não autenticados, redirecionando-os para a tela de login. |
| RF10 | O administrador deve poder criar, editar e excluir trilhas, incluindo a atualização do status de disponibilidade (aberta / fechada / em manutenção). |
| RF11 | O administrador deve poder criar, editar e excluir cachoeiras, incluindo o status de disponibilidade. |
| RF12 | O administrador deve poder criar, editar e excluir eventos e temporadas, incluindo datas e horários de funcionamento. |
| RF13 | O administrador deve poder publicar e excluir novidades exibidas aos visitantes. |
| RF14 | O administrador deve poder encerrar sua sessão (logout). |

## Requisitos Não-Funcionais

| ID | Descrição |
|----|-----------|
| RNF01 | Interface mobile-first e responsiva, com navegação adaptada para smartphones (barra inferior) e desktop (menu superior). |
| RNF02 | A aplicação deve ser instalável como PWA (Progressive Web App) a partir do navegador móvel. |
| RNF03 | As páginas devem ser renderizadas no servidor (SSR) e hospedadas em infraestrutura de borda para reduzir o tempo de resposta e suportar múltiplos usuários simultâneos. |
| RNF04 | A escrita de dados deve ser restrita a usuários autenticados, garantida por políticas de Row Level Security no banco de dados. |
| RNF05 | Credenciais de administradores devem ser armazenadas com hash de senha, delegado ao serviço de autenticação (Supabase Auth). |
| RNF06 | O código-fonte deve ser organizado em módulos coesos (componentes, dados, formulários administrativos) e versionado no GitHub. |
| RNF07 | A interface deve seguir uma identidade visual consistente (paleta de cores, tipografia e iconografia próprias), sem componentes genéricos de biblioteca de UI. |
| RNF08 | O sistema deve funcionar nos principais navegadores móveis modernos (Chrome, Safari). |

## Fora do Escopo

- Cadastro público de visitantes ou perfis de usuário — apenas
  administradores se autenticam.
- Sistema de reservas, ingressos ou pagamento online.
- Mapas interativos, geolocalização em tempo real ou rastreamento GPS
  durante a trilha.
- Banco de imagens reais dos parques — o MVP usa ilustrações vetoriais
  como identidade visual, já que não há acervo fotográfico oficial
  disponível para uso.
- Aplicativo nativo publicado em lojas (App Store / Google Play); a
  solução adotada é um site responsivo instalável (PWA).
- Notificações push.
- Múltiplos níveis de permissão administrativa — existe apenas o papel
  único de "administrador".
- Avaliações, comentários ou fóruns de visitantes.
- Integração com previsão do tempo em tempo real.
- Suporte a múltiplos idiomas (o conteúdo é apenas em português).
