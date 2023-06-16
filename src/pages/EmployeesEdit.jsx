import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Content from '../components/Content';
import Button from "../components/Button"
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'
import MiniDrawer from '../components/MiniDrawer'

const EmployeesEdit = () => {

    const { state: employee } = useLocation()
    console.log(employee)
    const navigate = useNavigate()

    const [fname, setFname] = useState(employee.fname)
    const [lname, setLname] = useState(employee.lname)
    const [cpf, setCpf] = useState(employee.cpf)
    const [email, setEmail] = useState(employee.email)
    const [office, setOffice] = useState(employee.office)
    const [wage, setWage] = useState(employee.wage)
    const [birth, setBirth] = useState(employee.birth)
    const [street, setStreet] = useState(employee.street)
    const [number, setNumber] = useState(employee.number)
    const [address, setAddress] = useState(employee.address)

    const handleEdit = async (event) => {
        event.preventDefault()
        const id = parseInt(event.target.id.value)
        const fname = event.target.fname.value
        const lname = event.target.lname.value
        const cpf = event.target.cpf.value
        const email = event.target.email.value
        const office = event.target.office.value
        const wage = event.target.wage.value
        const birth = event.target.birth.value
        const street = event.target.street.value
        const number = event.target.number.value
        const address = event.target.address.value
        const Employees = { id, fname, lname, cpf, email, email, office, wage, birth, street, number, address }
        try {
            const response = await fetch('http://localhost:3100/employees/',
                {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(Employees),
                })
            const data = await response.json()
            if (response.status === 200) {
                toast.success('Cliente editado com sucesso!')
                navigate('/funcionarios')
            } else {
                alert(data.message)
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <MiniDrawer>
                <Content>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", }}>
                        <form onSubmit={handleEdit} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Grid container spacing={2} sx={{ height: "100%", width: "70%", }}>
                                <TextField type="hidden" name="id" value={employee.id} />
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: '100%' }} variant='outlined'>
                                        <TextField name='fname' label="Nome" value={fname} variant="outlined" fullWidth onChange={e => setFname(e.target.value)} />
                                    </FormControl>
                                </Grid><br />
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: '100%' }} variant='outlined'>
                                        <TextField name='lname' label="Sobrenome" value={lname} variant="outlined" fullWidth onChange={e => setLname(e.target.value)}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: '100%' }} variant='outlined'>
                                        <TextField name='cpf' label="CPF" value={cpf} variant="outlined" fullWidth onChange={e => setCpf(e.target.value)} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: '100%' }} variant='outlined'>
                                        <TextField name='email' label="E-mail" value={email} variant="outlined" fullWidth onChange={e => setEmail(e.target.value)}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: '100%' }} variant='outlined'>
                                        <TextField name='office' label="Cargo" value={office} variant="outlined" fullWidth onChange={e => setOffice(e.target.value)}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: '100%' }} variant='outlined'>
                                        <TextField name='wage' label="Salário" value={wage} variant="outlined" fullWidth onChange={e => setWage(e.target.value)}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl sx={{ width: '100%' }} variant='outlined'>
                                        <TextField name='birth' label="Nascimento" value={birth} variant="outlined" fullWidth onChange={e => setBirth(e.target.value)}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: '100%' }} variant='outlined'>
                                        <TextField name='street' label="Rua" value={street} variant="outlined" fullWidth onChange={e => setStreet(e.target.value)} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: '100%' }} variant='outlined'>
                                        <TextField name='number' label="Numero" value={number} variant="outlined" fullWidth onChange={e => setNumber(e.target.value)}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: '100%' }} variant='outlined'>
                                        <TextField name='address' label="Bairro" value={address} variant="outlined" fullWidth onChange={e => setAddress(e.target.value)}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <div style={{ width: "30%", margin: 'auto' }}>
                                        <Button>Editar</Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Content>
            </MiniDrawer>
        </>
    )
}

export default EmployeesEdit