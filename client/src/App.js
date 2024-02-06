import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Divider,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import './App.css'
import Hidden from '@mui/material/Hidden'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Contact from './Contact'
import FAQ from './Faq'
import './global.css';



function App () {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openLogin, setOpenLogin] = useState(false)
  const [openRegister, setOpenRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLoginOpen = () => {
    setOpenLogin(true)
  }

  const handleLoginClose = () => {
    setOpenLogin(false)
  }

  const handleRegisterOpen = () => {
    setOpenRegister(true)
  }

  const handleRegisterClose = () => {
    setOpenRegister(false)
  }

  const handleLogin = event => {
    event.preventDefault()
    // Handle login logic here
    console.log(
      `Logging in with username: ${username} and password: ${password}`
    )
    setUsername('')
    setPassword('')
    handleLoginClose()
  }

  const handleRegister = event => {
    event.preventDefault()
    // Handle registration logic here
    console.log(
      `Registering with username: ${username}, email: ${email}, and password: ${password}`
    )
    setUsername('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    handleRegisterClose()
  }

  return (
    <Router>
      <div className='App'>
        <AppBar
          position='static'
          color='primary'
          sx={{ backgroundColor: '#4A90E2' }}
        >
          <Toolbar>
            <Hidden smUp>
              <IconButton
                edge='start'
                color='inherit'
                aria-label='menu'
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} href='/contact'>
                  Contact
                </MenuItem>
                <MenuItem onClick={handleClose} href='/faq'>
                  FAQ
                </MenuItem>
              </Menu>
            </Hidden>
            <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
              Ferrum Forms
            </Typography>
            <Hidden smDown>
              <Button color='inherit' href='/contact'>
                Contact
              </Button>
              <Button color='inherit' href='/faq'>
                FAQ
              </Button>
            </Hidden>
            <Hidden xsDown>
              <Button color='inherit' onClick={handleLoginOpen}>
                Login
              </Button>
              <Button
                color='inherit'
                onClick={handleRegisterOpen}
                variant='outlined'
                sx={{
                  '&:hover': {
                    backgroundColor: '#72aee6',
                    color: '#000000'
                  }
                }}
              >
                Register
              </Button>
            </Hidden>
          </Toolbar>
        </AppBar>

        <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Section 1
      </Typography>
      <Typography variant="body1">
        This is the first section of the home page.
      </Typography>

      <Divider variant="middle" />

      <Typography variant="h4" component="h1" gutterBottom>
        Section 2
      </Typography>
      <Typography variant="body1">
        This is the second section of the home page.
      </Typography>

      {/* Add more sections as needed */}
    </div>


        <Routes>
          <Route path='/contact' element={<Contact />} />
          <Route path='/faq' element={<FAQ />} />
        </Routes>

        <Dialog open={openLogin} onClose={handleLoginClose}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <form onSubmit={handleLogin}>
              <TextField
                label='Username'
                value={username}
                onChange={e => setUsername(e.target.value)}
                fullWidth
                margin='normal'
              />
              <TextField
                label='Password'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                margin='normal'
              />
              <DialogActions>
                <Button onClick={handleLoginClose}>Cancel</Button>
                <Button type='submit' color='primary'>
                  Login
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog open={openRegister} onClose={handleRegisterClose}>
          <DialogTitle>Register</DialogTitle>
          <DialogContent>
            <form onSubmit={handleRegister}>
              <TextField
                label='Username'
                value={username}
                onChange={e => setUsername(e.target.value)}
                fullWidth
                margin='normal'
              />
              <TextField
                label='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                margin='normal'
              />
              <TextField
                label='Password'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                margin='normal'
              />
              <TextField
                label='Confirm Password'
                type='password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                fullWidth
                margin='normal'
              />
              <DialogActions>
                <Button onClick={handleRegisterClose}>Cancel</Button>
                <Button type='submit' color='primary'>
                  Register
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Router>
  )
}

export default App
