import { Hidden } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './styles/Tabs.module.scss';
import { FormControl, MenuItem, Select } from '@mui/material'

function Tabs(props) {
    const [currentTab, setCurrentTab] = useState(props.defaultTab || props.tabs[0].tag);


    useEffect(() => {
        if (props.isStatic) {
            setCurrentTab(props.defaultTab || props.tabs[0].tag);
        }
    }, [props])

    const onTabSelect = (e) => {
        // console.log(e.target.name);
        if (!props.isStatic) {
            setCurrentTab(e.target.name);
            if (props.onTabChangedListener) {
                props.onTabChangedListener(e.target.name);
            }
        }
    }

    const handleChange = (e) => {
        if (!props.isStatic) {
            setCurrentTab(e.target.value);
            if (props.onTabChangedListener) {
                props.onTabChangedListener(e.target.value);
            }
        }
    };

    return (
        <>
            <Hidden smDown>
                <div className={styles.tabContianer}>
                    {props.tabs.map((data, index) => (
                        <button className={currentTab === data.tag ? styles.activeButton : styles.inActiveButton} name={data.tag} onClick={onTabSelect} key={index}>{data.label}</button>
                    ))}
                </div>
            </Hidden>
            <Hidden smUp>
                <div className={styles.tabContianer}>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            value={currentTab}
                            disabled={props.isStatic || false}
                            onChange={handleChange}>
                            {props.tabs.map((data, index) => (
                                <MenuItem value={data.tag} key={index}>{data.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </Hidden>
        </>
    )
}

export default Tabs