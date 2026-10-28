declare module 'postcss-hover-media-feature' {
  import type { PluginCreator } from 'postcss'

  const plugin: PluginCreator<{ fallback?: boolean }>
  export default plugin
}
