import React from 'react';
import Aux from '../Aux';
import Navbar from '../../components/UI/Navbar/Navbar';

const layout = (props) => (
  <Aux>
    <Navbar />
    <main>
      {props.children}
    </main>
  </Aux>
  )

export default layout;