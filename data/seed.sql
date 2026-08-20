-- Dados iniciais (seed) do Terê Verde Online.
-- Conteúdo ilustrativo sobre as três unidades de conservação de Teresópolis,
-- usado para popular o ambiente de desenvolvimento/demonstração do MVP.

insert into public.unidades_conservacao (nome, slug, tipo, descricao, area_km2, imagem_url) values
('Parque Nacional da Serra dos Órgãos', 'parnaso', 'Parque Nacional',
 'Criado em 1939, o PARNASO abriga formações rochosas icônicas como o Dedo de Deus e a Pedra do Sino, além de remanescentes de Mata Atlântica de altitude. É um dos destinos mais procurados do país para montanhismo e trekking.',
 200, null),
('Parque Estadual dos Três Picos', 'tres-picos', 'Parque Estadual',
 'Maior unidade de conservação estadual do Rio de Janeiro, reúne picos acima de 2.000 metros, cachoeiras e trilhas de longa distância entre os municípios de Teresópolis, Nova Friburgo, Cachoeiras de Macacu, Guapimirim e Silva Jardim.',
 468, null),
('Parque Natural Municipal Montanhas de Teresópolis', 'montanhas-teresopolis', 'Parque Natural Municipal',
 'Unidade de conservação municipal que protege áreas de mata próximas à zona urbana, funcionando como corredor ecológico entre o PARNASO e o Três Picos e oferecendo opções de trilhas mais leves para o dia a dia dos moradores.',
 15, null);

insert into public.trilhas (unidade_id, nome, slug, descricao, dificuldade, distancia_km, duracao_media_min, altitude_ganho_m, ponto_partida, status) values
((select id from public.unidades_conservacao where slug = 'parnaso'),
 'Trilha da Pedra do Sino', 'pedra-do-sino',
 'A trilha mais tradicional do parque, sobe até o ponto mais alto do PARNASO (2.263m). Pode ser feita em um dia (ida e volta) ou com pernoite no abrigo no topo.',
 'dificil', 9.4, 360, 1650, 'Sede Teresópolis (Alto da Boa Vista)', 'aberta'),
((select id from public.unidades_conservacao where slug = 'parnaso'),
 'Travessia Petrópolis–Teresópolis', 'travessia-petropolis-teresopolis',
 'Uma das travessias de montanha mais famosas do Brasil, passando pelo Dedo de Deus e pela Pedra do Sino. Exige preparo físico, equipamento de camping e normalmente 3 dias de caminhada.',
 'extrema', 42, 4320, 2200, 'Sede Petrópolis (Vale do Bonfim)', 'aberta'),
((select id from public.unidades_conservacao where slug = 'parnaso'),
 'Trilha do Açude / Bonita', 'trilha-do-acude',
 'Passeio curto e acessível dentro da Sede Teresópolis, ideal para famílias e para quem busca contato com a mata sem grande esforço físico.',
 'leve', 1.5, 45, 60, 'Sede Teresópolis (Alto da Boa Vista)', 'aberta'),
((select id from public.unidades_conservacao where slug = 'tres-picos'),
 'Trilha do Pico Maior de Friburgo', 'pico-maior-friburgo',
 'Trilha técnica que leva a um dos pontos mais altos do estado do Rio de Janeiro, com trechos de escalada leve e vistas de 360° da região serrana.',
 'extrema', 14, 600, 1400, 'Portal de Teresópolis (Ampliação)', 'aberta'),
((select id from public.unidades_conservacao where slug = 'montanhas-teresopolis'),
 'Trilha do Imbuí', 'trilha-do-imbui',
 'Trilha municipal de fácil acesso a partir do bairro Alto do Imbuí, com mirante e trecho de mata preservada, muito usada para caminhadas de fim de semana.',
 'moderada', 3.2, 90, 220, 'Bairro Alto do Imbuí', 'aberta');

insert into public.cachoeiras (unidade_id, nome, slug, descricao, altura_m, acesso, status) values
((select id from public.unidades_conservacao where slug = 'parnaso'),
 'Cachoeira Véu de Noiva', 'veu-de-noiva',
 'Queda d''água de fácil acesso próxima à Sede Teresópolis, com poço para banho em dias de menor vazão.',
 15, 'Acesso por trilha leve a partir da Sede Teresópolis', 'aberta'),
((select id from public.unidades_conservacao where slug = 'tres-picos'),
 'Cachoeira dos Frades', 'cachoeira-dos-frades',
 'Uma das cachoeiras mais visitadas da região, com múltiplas quedas e piscinas naturais em meio à Mata Atlântica preservada.',
 30, 'Acesso por trilha moderada, recomendado guia local', 'aberta'),
((select id from public.unidades_conservacao where slug = 'montanhas-teresopolis'),
 'Cachoeira do Imbuí', 'cachoeira-do-imbui',
 'Pequena queda d''água ao longo da Trilha do Imbuí, ponto de descanso comum para caminhantes.',
 8, 'Acesso pela Trilha do Imbuí', 'aberta');

insert into public.especies (unidade_id, nome_popular, nome_cientifico, categoria, descricao, estado_conservacao) values
((select id from public.unidades_conservacao where slug = 'parnaso'),
 'Muriqui-do-sul', 'Brachyteles arachnoides', 'fauna',
 'Um dos maiores primatas das Américas, encontrado nos remanescentes de Mata Atlântica preservada do parque. Espécie símbolo da conservação na Serra dos Órgãos.',
 'Em perigo'),
((select id from public.unidades_conservacao where slug = 'parnaso'),
 'Papagaio-de-cara-roxa', 'Amazona brasiliensis', 'fauna',
 'Ave rara associada aos fragmentos de Mata Atlântica da região serrana fluminense.',
 'Vulnerável'),
((select id from public.unidades_conservacao where slug = 'tres-picos'),
 'Onça-parda (suçuarana)', 'Puma concolor', 'fauna',
 'Maior predador registrado no Parque Estadual dos Três Picos, indicador da qualidade e conectividade da mata preservada.',
 'Quase ameaçada'),
((select id from public.unidades_conservacao where slug = 'montanhas-teresopolis'),
 'Bromélia-imperial', 'Alcantarea imperialis', 'flora',
 'Bromélia de grande porte, endêmica das serras do Rio de Janeiro, encontrada em afloramentos rochosos ao longo das trilhas municipais.',
 'Pouco preocupante');

insert into public.eventos (unidade_id, titulo, descricao, tipo, data_inicio, data_fim, horario_abertura, horario_fechamento, status) values
((select id from public.unidades_conservacao where slug = 'parnaso'),
 'Temporada de Visitação Pedra do Sino', 'Período recomendado para subida à Pedra do Sino com melhores condições climáticas.',
 'temporada', '2026-04-01', '2026-10-31', '07:00', '16:00', 'ativo'),
((select id from public.unidades_conservacao where slug = 'montanhas-teresopolis'),
 'Mutirão de Limpeza da Trilha do Imbuí', 'Ação comunitária de manutenção e limpeza da trilha, aberta a voluntários.',
 'evento', '2026-09-12', '2026-09-12', '08:00', '12:00', 'ativo');
