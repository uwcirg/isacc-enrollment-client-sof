import React from 'react';
import FhirClientProvider from "./FhirClientProvider";
import Summary from './components/Summary';
import './style/App.scss';
import ScheduleSetup from "./components/ScheduleSetup";
import {getDefaultMessageSchedule} from "./model/PlanDefinition";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import DemoVersionBanner from "./components/DemoVersionBanner";
import {IntlProvider} from "react-intl";

import messages_de from './l10n/intl_de_DE.json';
import messages_mn from './l10n/intl_mn.json';
import messages_en from './l10n/intl_en.json';
import {Typography, Stack} from "@mui/material";
import theme from "./theme";
import {ThemeProvider} from "@mui/styles";

export const intlMessages: any = {
    'en': messages_en,
    'de': messages_de,
    'mn': messages_mn
}

export default class App extends React.Component<any, any> {

    render() {
        const locale = "en";
        return (
            <IntlProvider key={locale} locale={locale} messages={intlMessages[locale]}>
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <FhirClientProvider>

                            <DemoVersionBanner/>
                            <Stack direction={"column"} sx={{padding: 1}}>
                                <Typography variant={"h5"}>Patient enrollment</Typography>
                                <Summary/>
                                <ScheduleSetup planDefinition={getDefaultMessageSchedule()}/>
                            </Stack>
                        </FhirClientProvider>
                    </LocalizationProvider>
                </ThemeProvider>
            </IntlProvider>
        );
    }
}
