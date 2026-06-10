import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-slate-800/50 border border-red-500/30 rounded-xl p-6 text-center">
          <p className="text-red-400 text-sm font-medium mb-1">
            {this.props.fallbackMessage || 'This section failed to load'}
          </p>
          <p className="text-slate-500 text-xs">{this.state.error?.message}</p>
        </div>
      )
    }
    return this.props.children
  }
}
