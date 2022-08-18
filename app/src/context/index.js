import React from 'react'
import useLocalStorage from '../database/useLocalStorage'

export const DatabaseContext = React.createContext()

export function DatabaseProvider({ children }) {
  const [components, setComponents] = useLocalStorage('components', {})

  return <DatabaseContext.Provider value={[components, setComponents]}>{children}</DatabaseContext.Provider>
}

export const AppState = React.createContext()
export function AppStateProvider({ children }) {
  const [appState, setAppState] = React.useState({
    isShowingVisualGuide: false,
    isShowingComponentInspector: false,
    inspectedComponentId: null,
  })

  return <AppState.Provider value={[appState, setAppState]}>{children}</AppState.Provider>
}
