import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core'

const Header = ({updateUsertype}) => (
  <div>
    <AppBar position="static">
      <Toolbar>
        <Button
          style={{ color: "white" }}
          onClick={updateUsertype}
        > 
          Tentti
        </Button> 
      </Toolbar>
    </AppBar>
  </div> 
)

export default Header
