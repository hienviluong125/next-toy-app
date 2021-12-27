import { useEffect, useState } from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  Container,
  Button,
  Avatar,
  Tooltip,
  MenuItem,
} from '@mui/material'
import { useRouter } from 'next/router'
import { logoutService } from '@frontend/services/authService'
import { getProfileService } from '@frontend/services/userService'

type CurrentUser = {
  email: string
  name?: string
}

const Header = () => {
  const router = useRouter()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [currentUser, setCurrentUser] = useState<null | CurrentUser>(null)

  useEffect(() => {
    getProfileService()
      .then(resp => {
        setCurrentUser(resp.data.currentUser)
      }).catch(err => console.log({err}))
  }, [])

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const onHandleLogout = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    logoutService()
      .then(() => {
        router.push('/login')
      }).catch(err => {
        if (err.response.status >= 400) {
          localStorage.removeItem('accessToken')
          router.push('/login')
        }
      })
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { lg: 'flex' } }}
          >
            NEXT-TOY-APP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { lg: 'flex' } }}>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <Button color="inherit" onClick={handleOpenUserMenu}>
                { currentUser?.email }
                &nbsp;
                <Avatar alt={'currentUser'} sx={{ width: 24, height: 24 }} />
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => router.push('/properties')}>
                <Typography textAlign='center'>Properties management</Typography>
              </MenuItem>
              <MenuItem onClick={onHandleLogout}>
                <Typography textAlign='center'>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
