// Bundle entry: re-export exactly the three symbols csa-shaders.js needs, so the
// emitted ESM file exposes { React, createRoot, Paper } as named exports.
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import * as Paper from '@paper-design/shaders-react'

export { React, createRoot, Paper }
