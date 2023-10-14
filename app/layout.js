import 'bootstrap/dist/css/bootstrap.min.css';
import Appbar from './Appbar';

export const metadata = {
  title: 'Moji App',
  description: 'Testing version',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Appbar/>
        {children}
        </body>
    </html>
  )
}
