import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {loginPost} from "../service/signInService";
import {TOKEN} from "../component/Constants";


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://itransition.com/" target="_blank">
                ITRANSITION
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}

        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {

    const navigate = useNavigate()

    const [stockData, setStockData] = useState({
        email: '',
        password: ''
    })


    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            // login ga qilingan zaprosni javobi response da
            const response = await loginPost(stockData)


            if (response.data.success === true) {
                navigate('/')
                localStorage.setItem(TOKEN, response?.data?.message)

                toast.success('Successfully login')

                console.log(localStorage.getItem(TOKEN))
            }



        } catch (err) {

            if (err?.response?.data?.errors?.length) {
                err.response.data.errors.forEach(er => {

                    toast.error(er?.errorMsg || 'Error', {toastId: 'error' + Math.random()})
                })
            } else {
                toast.error('Error', {toastId: 'error' + Math.random()})
            }

        }


    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                {/*{console.log(localStorage.getItem('ok'))}*/}
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            value={stockData.email}
                            onChange={e => setStockData({...stockData, email: e.target.value})}
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            value={stockData.password}
                            onChange={e => setStockData({...stockData, password: e.target.value})}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}

                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signUp" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
}
