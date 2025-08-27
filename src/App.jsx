import { ToastProvider, ThemeProvider, FlowProvider } from './context'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <ThemeProvider >
      <ToastProvider>
        <FlowProvider >
          <HomePage />
        </FlowProvider>
      </ToastProvider>
    </ThemeProvider >
   );
}
 
export default App;