import React from 'react';
import Aux from '../../hoc/Aux';

const layout = (props) => (
  <Aux>
    <div>Navbar, SideDrawer</div>
    <hr />
    <main>
      {props.children}
    </main>
  </Aux>
  )

export default layout;