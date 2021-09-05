// TODO: this component is created as a temporary solution for Raffle #5 calculator,
// we should create more flexible component that can accept data from different raffles
import React from 'react';
import {Box, CircularProgress, Grid, TextField, Tooltip, Typography} from '@material-ui/core';
import classNames from 'classnames';
import {useStyles} from '../styles';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import commonUtils from '../../../utils/commonUtils';

import ghst from '../../../assets/images/ghst-doubleside.gif';
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";

export default function RaffleDropTable({tickets, supplySpinner, pricesSpinner, setDropQuantity}) {
    const classes = useStyles();

    // const handleTicketsSupply = (event, type) => {
    //     setEnteredSupplyType(type);
    // };

    const getTicketIconPath = (iconId) => {
        return require(`../../../assets/tickets/${iconId}.svg`).default;
    };
    
    return (
        <Grid item>
            <Grid container alignItems='center' justify='space-between' spacing={2} className={classes.row}>
                <Grid item xs={12} md={3}>
                    <Typography variant='h6' className={classes.subtitle}>Your Tickets</Typography>
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    <Box maxWidth={200} margin='auto'>
                        <TextField
                            type='number'
                            variant='outlined'
                            fullWidth
                            className={classNames(classes.input, 'drop')}
                            label={'Drop'}
                            onChange={(event) => {
                                setDropQuantity(event.target.value);
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Grid container alignItems='center' justify='space-between' spacing={2} className={classes.row}>
                <Grid item xs={12} md={4} lg={3}>
                    <Typography variant='h6' className={classes.subtitle}>Items in Raffle</Typography>
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    {
                        tickets.map((ticket, i) => {
                            return <Box maxWidth={300} margin='auto' key={i}>
                                <Typography
                                    variant='body1'
                                    align='center'
                                    className={classNames(classes.textHighlight, ticket.type, classes.tableValue)}
                                >
                                    {commonUtils.formatNumber(ticket.items)}
                                </Typography>
                            </Box>
                        })
                    }
                </Grid>
            </Grid>
            <Grid container alignItems='center' justify='space-between' spacing={2} className={classes.row}>
                <Grid item xs={12} md={4} lg={3} className={classes.toggleWrapper}>
                    <Typography variant='h6' className={classes.subtitle}>
                        Tickets Supply
                        <Tooltip
                            placement='right'
                            arrow
                            enterTouchDelay={0}
                            title={
                                <React.Fragment>
                                    <Typography>Total number of entered tickets</Typography>
                                </React.Fragment>
                            }
                        >
                            <HelpOutlineIcon fontSize='small' className={classes.subtitleIcon} />
                        </Tooltip>
                    </Typography>
                    {/* <ToggleButtonGroup
                        value={enteredSupplyType}
                        exclusive
                        onChange={handleTicketsSupply}
                        aria-label='tickets supply'
                        size='small'
                        className={classes.toggleButtonWrapper}
                    >
                        <ToggleButton className={classes.toggleButton} value={true} aria-label='entered supply'>
                            Entered
                        </ToggleButton>
                        <ToggleButton className={classes.toggleButton} value={false} aria-label='all supply'>
                            All
                        </ToggleButton>
                    </ToggleButtonGroup> */}
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    {
                        tickets.map((ticket, i) => {
                            return <Box maxWidth={300} minWidth={80} margin='auto' key={i} className={classes.ticketBg}>
                                <img src={getTicketIconPath(ticket.type)} alt={'ticket-' + ticket.type} />
                                <Box align='center' className={classNames(classes.textHighlight, ticket.type, classes.ticketVisual)}>
                                    {supplySpinner ? (
                                        <CircularProgress color="inherit" size={20} style={{bottom: -5, position: 'relative'}}/>
                                    ) : (
                                        <Typography
                                            variant='body1'
                                            align='center'
                                            className={classNames(classes.tableValue, classes.price)}
                                        >
                                            {commonUtils.formatNumber(ticket.entered)}
                                            {/* {enteredSupplyType ? (
                                                <Box component={'span'} className={classes.enteredValue}>
                                                    <Box component={'span'}>
                                                        {commonUtils.formatNumber(ticket.entered)}
                                                    </Box>
                                                    <Box component={'span'} className={classNames(classes.enteredValuePerc, 'perc')}>
                                                        {(ticket.entered * 100 / ticket.supply).toFixed(1)} %
                                                    </Box>
                                                </Box>

                                            ) : (
                                                commonUtils.formatNumber(ticket.supply)
                                            )} */}
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        })
                    }
                </Grid>
            </Grid>
            <Grid container alignItems='center' justify='space-between' spacing={2} className={classes.row}>
                <Grid item xs={12} md={4} lg={3}>
                    <Typography variant='h6' className={classes.subtitle}>
                        Frens market cap
                        <Tooltip
                            placement='right'
                            arrow
                            enterTouchDelay={0}
                            title={
                                <React.Fragment>
                                    <Typography>Total amount of frens spent to the tickets</Typography>
                                </React.Fragment>
                            }
                        >
                            <HelpOutlineIcon fontSize='small' className={classes.subtitleIcon} />
                        </Tooltip>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    {
                        tickets.map((ticket, i) => {
                            return <Box maxWidth={300} margin='auto' key={i} className={classNames(classes.chance, ticket.type)}>
                                <Box align='center' className={classNames(classes.textHighlight, ticket.type, classes.ticketVisual)}>
                                    {supplySpinner ? (
                                        <CircularProgress color="inherit" size={20} style={{bottom: -5, position: 'relative'}}/>
                                    ) : (
                                        <Typography
                                            variant='body1'
                                            align='center'
                                            className={classNames(classes.tableValue, classes.price)}
                                        >
                                            {commonUtils.formatNumber(ticket.entered * ticket.priceInFrens)}
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        })
                    }
                </Grid>
            </Grid>
            <Grid container alignItems='center' justify='space-between' spacing={2} className={classes.row}>
                <Grid item xs={12} md={4} lg={3}>
                    <Typography variant='h6' className={classes.subtitle}>
                        Estimated baazaar price
                        <Tooltip
                            placement='right'
                            arrow
                            enterTouchDelay={0}
                            title={
                                <React.Fragment>
                                    <Typography>Average ticket price on Baazaar for the last 5 trades</Typography>
                                </React.Fragment>
                            }
                        >
                            <HelpOutlineIcon fontSize='small' className={classes.subtitleIcon} />
                        </Tooltip>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    {
                        tickets.map((ticket, i) => {
                            return <Box maxWidth={300} margin='auto' key={i}>
                                <Box align='center' className={classNames(classes.textHighlight, ticket.type)}>
                                    {pricesSpinner ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : (
                                        <Typography
                                            variant='body1'
                                            align='center'
                                            className={classNames(classes.tableValue, classes.price)}
                                        >
                                            {ticket.cost}
                                            <img src={ghst} width='26' alt='GHST Token Icon' />
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        })
                    }
                </Grid>
            </Grid>
            <Grid container alignItems='center' justify='space-between' spacing={2} className={classes.row}>
                <Grid item xs={12} md={4} lg={3}>
                    <Typography variant='h6' className={classes.subtitle}>
                        Your items
                        <Tooltip
                            placement='right'
                            arrow
                            enterTouchDelay={0}
                            title={
                                <React.Fragment>
                                    <Typography>How many items you will get on average</Typography>
                                </React.Fragment>
                            }
                        >
                            <HelpOutlineIcon fontSize='small' className={classes.subtitleIcon} />
                        </Tooltip>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    {
                        tickets.map((ticket, i) => {
                            return <Box maxWidth={300} padding={1} margin='auto' key={i} className={classNames(classes.chance, ticket.type, ticket.chance !== 0 ? 'highlighted' : '')}>
                                <Typography
                                    variant='body1'
                                    align='center'
                                    className={classNames(classes.textHighlight, ticket.type, classes.tableValue)}
                                >
                                    {ticket.chance}
                                </Typography>
                            </Box>
                        })
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}