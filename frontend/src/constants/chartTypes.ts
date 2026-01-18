export const CHART_TYPES = [
  { value: 'bar', label: 'Barras Verticais', icon: '📊' },
  { value: 'line', label: 'Linha', icon: '📈' },
  { value: 'point', label: 'Pontos (Scatter)', icon: '⚫' },
  { value: 'area', label: 'Área', icon: '📉' },
  { value: 'rect', label: 'Heatmap', icon: '🟦' },
  { value: 'arc', label: 'Pizza/Donut', icon: '🍩' },
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
