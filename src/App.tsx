import { useState, useCallback, useMemo, useContext, ChangeEvent} from 'react';
import {AppContextProvider} from './utils/AppContext';
import Search from './Search';
import './App.css';

import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

const actions = [
  {icon: <FileCopyIcon />, name: 'Copy'  },
  {icon: <SaveIcon     />, name: 'Save'  },
  {icon: <PrintIcon    />, name: 'Print' },
  {icon: <ShareIcon    />, name: 'Share' },
];

function App() {
  
  const [count, setCount] = useState(0);
  const [results, setResults] = useState<Array<string>>([])

  return (
    <div id="app">
      <AppContextProvider time={new Date()}>
        <Search value="" />
      </AppContextProvider>
    </div>
  )
}

export default App
