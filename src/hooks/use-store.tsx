import { useContext, useReducer, createContext } from 'react'
import reducer, { IAction, initialState, IStore } from 'src/reducers/reducer'

type IContext = {
  state: IStore
  dispatch: React.Dispatch<IAction>
}

const StoreContext = createContext<IContext | null>(null)

export const useStore = () => {
  const contextValue = useContext(StoreContext)
  if (contextValue === null) {
    throw Error('Context has not been Provided!')
  }
  return contextValue
}

interface IProps {
  children: JSX.Element
}

export const StoreContextProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const context = {
    state,
    dispatch,
  }

  return (
    <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
  )
}
