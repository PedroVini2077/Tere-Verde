export type Dificuldade = "leve" | "moderada" | "dificil" | "extrema";
export type StatusAtracao = "aberta" | "fechada" | "manutencao";
export type TipoEvento = "evento" | "temporada";
export type StatusEvento = "ativo" | "cancelado" | "encerrado";
export type CategoriaEspecie = "fauna" | "flora";

export interface UnidadeConservacao {
  id: string;
  nome: string;
  slug: string;
  tipo: string;
  descricao: string;
  area_km2: number | null;
  imagem_url: string | null;
  created_at: string;
}

export interface Trilha {
  id: string;
  unidade_id: string | null;
  nome: string;
  slug: string;
  descricao: string;
  dificuldade: Dificuldade;
  distancia_km: number | null;
  duracao_media_min: number | null;
  altitude_ganho_m: number | null;
  ponto_partida: string | null;
  status: StatusAtracao;
  imagem_url: string | null;
  created_at: string;
  updated_at: string;
  unidades_conservacao?: Pick<UnidadeConservacao, "nome" | "slug"> | null;
}

export interface Cachoeira {
  id: string;
  unidade_id: string | null;
  nome: string;
  slug: string;
  descricao: string;
  altura_m: number | null;
  acesso: string | null;
  status: StatusAtracao;
  imagem_url: string | null;
  created_at: string;
  updated_at: string;
  unidades_conservacao?: Pick<UnidadeConservacao, "nome" | "slug"> | null;
}

export interface Especie {
  id: string;
  unidade_id: string | null;
  nome_popular: string;
  nome_cientifico: string | null;
  categoria: CategoriaEspecie;
  descricao: string;
  estado_conservacao: string | null;
  imagem_url: string | null;
  created_at: string;
  unidades_conservacao?: Pick<UnidadeConservacao, "nome" | "slug"> | null;
}

export interface Evento {
  id: string;
  unidade_id: string | null;
  titulo: string;
  descricao: string;
  tipo: TipoEvento;
  data_inicio: string;
  data_fim: string | null;
  horario_abertura: string | null;
  horario_fechamento: string | null;
  status: StatusEvento;
  imagem_url: string | null;
  created_at: string;
  updated_at: string;
  unidades_conservacao?: Pick<UnidadeConservacao, "nome" | "slug"> | null;
}

export interface Novidade {
  id: string;
  titulo: string;
  conteudo: string;
  autor_id: string | null;
  publicado_em: string;
}
