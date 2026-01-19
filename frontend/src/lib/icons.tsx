import {
  faChartColumn,
  faChartLine,
  faCircle,
  faChartArea,
  faTableCells,
  faChartPie,
  faSave,
  faFileExport,
  faCopy,
  faDownload,
  faCheck,
  faXmark,
  faTriangleExclamation,
  faCircleInfo,
  faLightbulb,
  faPalette,
  faChartSimple,
  faRocket,
  faEye,
  faArrowsRotate,
  faGear,
  faPlus,
  faFilter,
  faGripVertical,
  faPaintBrush,
  faFillDrip,
  faDroplet,
  faEyeDropper,
  faSliders,
  faWandMagicSparkles,
  faBolt,
  faLayerGroup,
  faCode,
  faFileCode,
  faSquare,
  faFont,
  faMinus,
  faMapLocationDot,
  faCircleDot,
  faRulerVertical,
  faChartGantt,
  faHashtag,
} from '@fortawesome/free-solid-svg-icons'

// Chart Type Icons
export const ChartIcons = {
  bar: faChartColumn,
  line: faChartLine,
  point: faCircle,
  area: faChartArea,
  rect: faTableCells,
  arc: faChartPie,
  boxplot: faChartSimple,
  circle: faCircleDot,
  square: faSquare,
  tick: faMinus,
  trail: faChartLine,
  rule: faRulerVertical,
  text: faFont,
  geoshape: faMapLocationDot,
  errorbar: faChartGantt,
  errorband: faChartArea,
} as const

// Action Icons
export const ActionIcons = {
  save: faSave,
  export: faFileExport,
  copy: faCopy,
  download: faDownload,
  add: faPlus,
  filter: faFilter,
  settings: faGear,
  code: faCode,
  fileCode: faFileCode,
} as const

// Status Icons
export const StatusIcons = {
  success: faCheck,
  error: faXmark,
  warning: faTriangleExclamation,
  info: faCircleInfo,
  lightbulb: faLightbulb,
} as const

// Design Icons
export const DesignIcons = {
  palette: faPalette,
  paintbrush: faPaintBrush,
  fillDrip: faFillDrip,
  droplet: faDroplet,
  eyeDropper: faEyeDropper,
  sliders: faSliders,
  magic: faWandMagicSparkles,
  grip: faGripVertical,
} as const

// Feature Icons
export const FeatureIcons = {
  chart: faChartSimple,
  rocket: faRocket,
  eye: faEye,
  rotate: faArrowsRotate,
  bolt: faBolt,
  layers: faLayerGroup,
} as const

// Export all icons
export const Icons = {
  ...ChartIcons,
  ...ActionIcons,
  ...StatusIcons,
  ...DesignIcons,
  ...FeatureIcons,
} as const

export type IconName = keyof typeof Icons
