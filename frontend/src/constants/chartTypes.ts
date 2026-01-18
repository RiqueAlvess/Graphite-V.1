import { ChartIcons } from '../lib/icons'

export const CHART_TYPES = [
  { value: 'bar', label: 'Barras Verticais', icon: ChartIcons.bar },
  { value: 'line', label: 'Linha', icon: ChartIcons.line },
  { value: 'point', label: 'Pontos (Scatter)', icon: ChartIcons.point },
  { value: 'area', label: 'Área', icon: ChartIcons.area },
  { value: 'rect', label: 'Heatmap', icon: ChartIcons.rect },
  { value: 'arc', label: 'Pizza/Donut', icon: ChartIcons.arc },
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
