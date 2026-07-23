import { AppRouter } from './router'
import { MotionProvider } from '../components/motion/MotionSystem'

export function App() {
  return <MotionProvider><AppRouter /></MotionProvider>
}
