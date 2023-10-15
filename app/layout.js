import 'bootstrap/dist/css/bootstrap.min.css';
import Appbar from './Appbar';
import { CustomProviders } from './provider';

export const metadata = {
  title: 'Moji App',
  description: 'Testing version',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomProviders>
          <Appbar/>
          {children}
        </CustomProviders>
      </body>
    </html>
  )
}
