/**
 * The CSA design system renders three Paper-shader web components (registered
 * at runtime by public/assets/csa-shaders.js). Declare them so TSX accepts the
 * custom elements. React 19 sources JSX types from the `react` module's JSX
 * namespace, so we augment that (the legacy global `JSX` namespace is ignored
 * under the automatic runtime).
 */
import 'react'

type CsaElementProps = Record<string, unknown>

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'csa-grain': CsaElementProps
      'csa-liquid-metal': CsaElementProps
      'csa-pulsing-border': CsaElementProps
    }
  }
}
