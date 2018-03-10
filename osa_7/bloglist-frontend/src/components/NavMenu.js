import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const NavMenu = ({ username, logoutHandler }) => (
	<div>
		<Menu inverted color='violet'>
			<Menu.Item header>Blog App</Menu.Item>
			<Menu.Item link>
				<Link to='/'>Blogs</Link>
			</Menu.Item>
			<Menu.Item link>
				<Link to='/users/'>Users</Link>
			</Menu.Item>

			<div className='right menu'>
				<Menu.Item>
					<em>{username} logged in</em>
				</Menu.Item>

				<Menu.Item>
					<button className='neutral ui button' type='submit' onClick={logoutHandler}>
						<Link to='/'>Log out</Link>
					</button>
				</Menu.Item>
			</div>
		</Menu>
	</div>
)

export default NavMenu