import React, { useState } from 'react'
import Tabs from '../common/components/Tabs';
import AppContainer from '../containers/AppContainer';

function ApplicationData() {
    const [currentTab, setCurrentTab] = useState('fit_type');

    const onTabChangedListener = (id) => {
        setCurrentTab(id);
    }

    return (
        <AppContainer>
            <Tabs {...{
                onTabChangedListener: onTabChangedListener,
                tabs: [
                    { tag: "fit_type", label: "Fit Type" },
                    { tag: "body_type", label: "Body Type" },
                    { tag: "occasion", label: "Occasion" },
                    { tag: "personal_style", label: "Personal Styles" },
                    { tag: "categories", label: "Categories" }]
            }} />
            <div style={{ margin: '1rem' }}>
                {currentTab === 'fit_type' && <div />}
                {currentTab === 'body_type' && <div />}
                {currentTab === 'occasion' && <div />}
                {currentTab === 'personal_style' && <div />}
                {currentTab === 'categories' && <div />}
            </div>
        </AppContainer>
    )
}

export default ApplicationData