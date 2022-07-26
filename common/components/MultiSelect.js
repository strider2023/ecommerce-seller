import React from 'react';
import { Chip, FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
        color: 'white',
        backgroundColor: 'purple'
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, selectedValues, theme) {
    return {
        fontWeight:
            selectedValues.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function MultiSelect(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [selectedValues, setSelectedValues] = React.useState(props.value);

    const handleChange = (event) => {
        setSelectedValues(event.target.value);
        props.onChange(event, props.keyName, event.target.value);
    };

    return (
        <FormControl variant="filled" fullWidth>
            <InputLabel id="select-event-label">{props.label}</InputLabel>
            <Select
                labelId="select-event-label"
                id="select-event"
                multiple
                value={selectedValues}
                onChange={handleChange}
                input={<Input id="select-event-chip" />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={props.options.find((val) => val.id === parseInt(value)).label} className={classes.chip} />
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}>
                {props.options.map((data, index) => (
                    <MenuItem key={data.id} value={data.id} style={getStyles(data.label, selectedValues, theme)}>
                        {data.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default MultiSelect