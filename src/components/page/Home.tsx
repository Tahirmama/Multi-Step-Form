import { Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import {  TextField } from 'formik-material-ui';
import React, { useState } from 'react';


const sleep = (time: number | undefined) => new Promise((acc) => setTimeout(acc, time));

export default function Home() {
    return (
        <Card >
            <CardContent>
                <FormikStepper
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        Age: 0,
                        City:"",
                        ResidentialAddress: "",
                        Country:"",
                        money: 0,
                        CardNumber:0,
                        description: '',
                        fieldname: '',


                    }}
                    onSubmit={async (values) => {
                        await sleep(3000);
                        console.log('values', values);
                    }}
                >
                    <FormikStep label="Personal Data" >
                        <Box paddingBottom={2}>
                            <Field fullWidth name="firstName" component={TextField} label="First Name" />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="lastName" component={TextField} label="Last Name" />
                        </Box>
                        <Box paddingBottom={5}>
                            <Field fullWidth name="Age" type="number" component={TextField} label=" Age" />
                        </Box>
                     
                    </FormikStep>
                    <FormikStep 
                    label="Residential Info">
                      <Box paddingBottom={2}>
                            <Field
                                fullWidth
                                name="City"
                                component={TextField}
                                label="City Name"
                            />
                        </Box> 
                        <Box paddingBottom={2}>
                            <Field
                                fullWidth
                                name="ResidentialAddress"
                                component={TextField}
                                label="Residential Address"
                            />
                        </Box> 
                        <Box paddingBottom={6}>
                            <Field
                                fullWidth
                                name="Country"
                                component={TextField}
                                label="Country Name"
                            />
                        </Box> 

                        </FormikStep>
                    <FormikStep
                        label="Payment Info"
                    >
                        <Box paddingBottom={2}>
                            <Field
                                fullWidth
                                name="money"
                                type="number"
                                component={TextField}
                                label="Money You have in your account"
                            />
                        </Box>
                        <Box paddingBottom={6}>
                        <Field
                                fullWidth
                                name="CardNumber"
                                type="number"
                                component={TextField}
                                label="Your Card Number"
                            />
                        </Box>
                    </FormikStep>
                    <FormikStep label="Info Of Work">
                        <Box paddingBottom={2}>
                            <Field fullWidth name="description" component={TextField} label="Details about your work" />
                        </Box>
                        <Box paddingBottom={6}>
                            <Field fullWidth name="fieldname" component={TextField} label=" Occupation" />
                        </Box>
                    </FormikStep>
                </FormikStepper>
            </CardContent>
        </Card>
    );
}

export interface FormikStepProps
    extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
    label: string;
}

export function FormikStep({ children }: FormikStepProps) {
    return <>
    {children}</>;
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    const [completed, setCompleted] = useState(false);

    function isLastStep() {
        return step === childrenArray.length - 1;
    }

    return (
        <Formik
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await props.onSubmit(values, helpers);
                    setCompleted(true);
                } else {
                    setStep((s) => s + 1);


                    // If you have multiple fields on the same step
                    // we will see they show the validation error all at the same time after the first step!

                    // If you want the second/third/fourth/etc steps with the same behaviour
                    //    as the first step regarding validation errors, then the next line is for you! =)
                    //
                    // In the example of the video, it doesn't make any difference, because we only
                    //    have one field with validation in the second step :)
                    helpers.setTouched({});
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form autoComplete="off" >
                    <Stepper alternativeLabel activeStep={step} >
                        {childrenArray.map((child, index) => (
                            <Step  key={child.props.label} completed={step > index || completed}>
                                <StepLabel >{child.props.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {currentChild}
                    {/* style={{ background: '#82b74b' }} */}

                    <Grid container spacing={2}>
                        {step > 0 ? (
                            <Grid item>
                                <Button
                                    disabled={isSubmitting}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setStep((s) => s - 1)}
                                >
                                    Back
                                </Button>
                            </Grid>
                        ) : null}
                        <Grid item>
                            <Button
                                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                                disabled={isSubmitting}
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                disabled={isSubmitting}
                                variant="contained"
                                color="primary"
                                onClick={() => setStep((0) )}
                            >
                                Reset
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}