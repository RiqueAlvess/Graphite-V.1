import { ChartIcons } from '../lib/icons'

export const CHART_TYPES = [
  // Principais
  { value: 'bar', label: 'Barras Verticais', icon: ChartIcons.bar, category: 'Principais' },
  { value: 'line', label: 'Linha', icon: ChartIcons.line, category: 'Principais' },
  { value: 'area', label: 'Área', icon: ChartIcons.area, category: 'Principais' },
  { value: 'arc', label: 'Pizza/Donut', icon: ChartIcons.arc, category: 'Principais' },

  // Dispersão e Pontos
  { value: 'point', label: 'Dispersão (Scatter)', icon: ChartIcons.point, category: 'Pontos' },
  { value: 'circle', label: 'Círculos', icon: ChartIcons.circle, category: 'Pontos' },
  { value: 'square', label: 'Quadrados', icon: ChartIcons.square, category: 'Pontos' },
  { value: 'tick', label: 'Marcas (Tick)', icon: ChartIcons.tick, category: 'Pontos' },

  // Avançados
  { value: 'rect', label: 'Heatmap', icon: ChartIcons.rect, category: 'Avançados' },
  { value: 'boxplot', label: 'Boxplot', icon: ChartIcons.boxplot, category: 'Avançados' },
  { value: 'trail', label: 'Trilha (Trail)', icon: ChartIcons.trail, category: 'Avançados' },
  { value: 'rule', label: 'Linha de Referência', icon: ChartIcons.rule, category: 'Avançados' },
  { value: 'text', label: 'Texto', icon: ChartIcons.text, category: 'Avançados' },
  { value: 'errorbar', label: 'Barras de Erro', icon: ChartIcons.errorbar, category: 'Avançados' },
  { value: 'errorband', label: 'Faixa de Erro', icon: ChartIcons.errorband, category: 'Avançados' },
  { value: 'geoshape', label: 'Mapa (GeoShape)', icon: ChartIcons.geoshape, category: 'Avançados' },
]

export const DEFAULT_VEGA_SPEC = {
  $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
  data: { name: 'dataset' },
  mark: {
    type: 'bar',
    tooltip: true,
  },
  encoding: {
    x: { field: 'categoria', type: 'nominal', axis: { title: 'Categoria' } },
    y: { field: 'valor', type: 'quantitative', axis: { title: 'Valor' } },
  },
  config: {
    background: '#121826',
    view: {
      stroke: null,
    },
  },
}
