import React, { useState } from 'react'
import Tabs from '../common/components/Tabs';
import AppContainer from '../containers/AppContainer';

function UserList() {
  const [currentTab, setCurrentTab] = useState('seller');

  const onTabChangedListener = (id) => {
    setCurrentTab(id);
  }

  return (
    <AppContainer>
      <Tabs {...{
        onTabChangedListener: onTabChangedListener,
        tabs: [
          { tag: "seller", label: "Sellers" },
          { tag: "stylists", label: "Stylists" },
          { tag: "influencers", label: "Influencers" },
          { tag: "admin", label: "Admins" }]
      }} />
      <div style={{ margin: '1rem' }}>
        {currentTab === 'seller' && <div />}
        {currentTab === 'stylists' && <div />}
        {currentTab === 'influencers' && <div />}
        {currentTab === 'admin' && <div />}
      </div>
    </AppContainer>
  )
}

export default UserList