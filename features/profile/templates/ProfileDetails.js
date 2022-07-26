import { List, ListItem, ListItemText } from '@mui/material';
import styles from './styles/ProfileDetails.module.scss';
import React from 'react';
import Link from 'next/link';

function ProfileDetails(props) {
    return (
        <>
            <p className={styles.helpText}>To update the details, please contact
                <Link href="mailto:support@lehlah.club" passHref>
                    <span className={styles.mailLink}> support@lehlah.club</span>
                </Link>
            </p>
            <List sx={{ width: '100%', maxWidth: 360, }}>
                <ListItem>
                    <ListItemText primary="Business Name" secondary={props.manufName} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Contact Name" secondary={props.contactName} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Store Address" secondary={props.addr.toString()} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Website" secondary={props.website} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Email" secondary={props.emails.toString()} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Phone" secondary={props.phs.toString()} />
                </ListItem>
            </List>
        </>
    )
}

export default ProfileDetails