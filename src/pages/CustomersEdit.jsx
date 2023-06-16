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

const CustomersEdit = () => {

    const { state: client } = useLocation()
    console.log(client)
    const navigate = useNavigate()

    const [fname, setFname] = useState(client.fname)
    const [lname, setLname] = useState(client.lname)
    const [cpf, setCpf] = useState(client.cpf)
    const [dateOfBirth, setDateOfBirth] = useState(client.dateOfBirth)
    const [phone, setPhone] = useState(client.phone)
    const [email, setEmail] = useState(client.email)
    const [address, setAddress] = useState(client.address)
    const [street, setStreet] = useState(client.street)
    const [cep, setCep] = useState(client.cep)
    const [houseNumber, setHouseNumber] = useState(client.houseNumber)
    const [referencePoint, setReferencePoint] = useState(client.referencePoint)

    const handleEdit = async (event) => {
        event.preventDefault()
        const id = parseInt(event.target.id.value)
        const fname = event.target.fname.value
        const lname = event.target.lname.value
        const cpf = event.target.cpf.value
        const dateOfBirth = event.target.dateOfBirth.value
        const phone = event.target.phone.value
        const email = event.target.email.value
        const address = event.target.address.value
        const street = event.target.street.value
        const cep = event.target.cep.value
        const houseNumber = event.target.houseNumber.value
        const referencePoint = event.target.referencePoint.value
        const clientEdited = { id, fname, lname, cpf, dateOfBirth, phone, email, address, street, cep, houseNumber, referencePoint }
        try {
            const response = await fetch('http://localhost:3100/client',
                {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(clientEdited),
                })
            const data = await response.json()
            if (response.status === 200) {
                toast.success('Cliente editado com sucesso!')
                navigate('/clientes')
                // setOpenModal(false)
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
                                <TextField type="hidden" name="id" value={client.id} />
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
                                        <TextField name='dateOfBirth' label="Data de Nascimento" value={dateOfBirth} variant="outlined" fullWidth onChange={e => setDateOfBirth(e.target.value)}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: '100%' }} variant='outlined'>
                                        <TextField name='phone' label="Telefone" value={phone} variant="outlined" fullWidth onChange={e => setPhone(e.target.value)}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: '100%' }} variant='outlined'>
                                        <TextField name='email' label="E-mail" value={email} variant="outlined" fullWidth onChange={e => setEmail(e.target.value)}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl sx={{ width: '100%' }} variant='outlined'>
                                        <TextField name='address' label="Endereço" value={address} variant="outlined" fullWidth onChange={e => setAddress(e.target.value)}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: '100%' }} variant='outlined'>
                                        <TextField name='street' label="Bairro" value={street} variant="outlined" fullWidth onChange={e => setStreet(e.target.value)} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: '100%' }} variant='outlined'>
                                        <TextField name='cep' label="CEP" value={cep} variant="outlined" fullWidth onChange={e => setCep(e.target.value)}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: '100%' }} variant='outlined'>
                                        <TextField name='houseNumber' label="Nº Casa" value={houseNumber} variant="outlined" fullWidth onChange={e => setHouseNumber(e.target.value)}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: '100%' }} variant='outlined'>
                                        <TextField name='referencePoint' label="Complemento" value={referencePoint} variant="outlined" fullWidth onChange={e => setReferencePoint(e.target.value)}/>
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

export default CustomersEdit